
import React, { useState, useEffect, useMemo } from 'react';
import { User, Product, TradeOffer, Payment, PlanType, AdminStats } from './types';
import { db } from './services/db';
// Fix: Import PLANS directly from constants
import { PLANS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import Plans from './pages/Plans';
import Login from './pages/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<TradeOffer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    db.init();
    refreshData();
  }, []);

  const refreshData = () => {
    setProducts(db.getProducts());
    setOffers(db.getOffers());
    setPayments(db.getPayments());
    setUsers(db.getUsers());
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, 5000);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setCurrentPage('home');
    if (u.isAdmin) {
      addNotification(`¡Bienvenido Admin ${u.name}!`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  const handleMakeOffer = (offeredIds: string[]) => {
    if (!user || !selectedProductId) return;
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    const newOffer: TradeOffer = {
      id: `off-${Date.now()}`,
      fromUserId: user.id,
      toUserId: product.userId,
      targetProductId: selectedProductId,
      offeredProductIds: offeredIds,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    db.saveOffer(newOffer);
    refreshData();
    alert('¡Oferta de trueque enviada con éxito!');
  };

  const stats: AdminStats = useMemo(() => ({
    totalUsers: users.length,
    totalTransactions: offers.filter(o => o.status === 'accepted').length,
    totalRevenue: payments.filter(p => p.verified).reduce((acc, curr) => acc + curr.amount, 0),
    activeProducts: products.length
  }), [users, offers, payments, products]);

  const onVerifyPayment = (id: string) => {
    const paymentList = db.getPayments();
    const pIdx = paymentList.findIndex(p => p.id === id);
    if (pIdx > -1) {
      paymentList[pIdx].verified = true;
      localStorage.setItem('trueque_payments', JSON.stringify(paymentList));
      refreshData();
      addNotification("Pago verificado correctamente.");
    }
  };

  const onDeleteProduct = (id: string) => {
    const pList = db.getProducts().filter(p => p.id !== id);
    localStorage.setItem('trueque_products', JSON.stringify(pList));
    refreshData();
    addNotification("Publicación eliminada.");
  };

  const handleSelectPlan = (plan: PlanType) => {
    if (!user) return;
    // Fix: Use imported PLANS instead of require to avoid "Cannot find name 'require'" error
    const planObj = PLANS.find(p => p.type === plan);
    
    if (!planObj) return;

    // Simulate payment creation
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      userId: user.id,
      amount: planObj.price,
      concept: 'subscription',
      date: new Date().toISOString(),
      verified: false
    };

    db.savePayment(newPayment);
    // Note: In real app, we update user plan only after verification.
    // Here we simulate alert to admin
    if (user.isAdmin) {
        addNotification(`Alerta Admin: Nuevo pago de suscripción para verificar (${user.email})`);
    }

    alert('Solicitud de cambio de plan enviada. Un administrador verificará tu pago.');
    refreshData();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            products={products} 
            user={user} 
            onProductClick={handleProductClick} 
            onPromoteClick={() => setCurrentPage('plans')}
          />
        );
      case 'product-detail':
        const prod = products.find(p => p.id === selectedProductId);
        if (!prod) return <div>Cargando...</div>;
        return (
          <ProductDetail 
            product={prod} 
            currentUser={user} 
            owner={users.find(u => u.id === prod.userId) || null}
            onMakeOffer={handleMakeOffer}
            userProducts={products.filter(p => p.userId === user?.id)}
          />
        );
      case 'admin':
        if (!user?.isAdmin) return <div className="p-10 text-center">No autorizado</div>;
        return (
          <AdminDashboard 
            users={users} 
            products={products} 
            payments={payments} 
            stats={stats}
            onDeleteProduct={onDeleteProduct}
            onVerifyPayment={onVerifyPayment}
          />
        );
      case 'login':
        return <Login onLogin={handleLogin} users={users} />;
      case 'plans':
        return <Plans onSelectPlan={handleSelectPlan} currentPlan={user?.plan} />;
      default:
        return <div className="p-10 text-center">Página no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={setCurrentPage} 
        onSearch={() => {}} 
      />
      
      {/* Admin Alerts Overlay */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-[100] space-y-2 pointer-events-none">
          {notifications.map((n, i) => (
            <div key={i} className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl font-bold animate-bounce pointer-events-auto">
              {n}
            </div>
          ))}
        </div>
      )}

      <main className="flex-1">
        {renderPage()}
      </main>

      <footer className="bg-white border-t py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Trueque</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Quiénes somos</li>
              <li>Blog</li>
              <li>Ayuda</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Planes</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Plan Básico</li>
              <li>Plan Medio</li>
              <li>Plan Premium</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legales</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>Términos y condiciones</li>
              <li>Privacidad</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Redes</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 border-t mt-8 pt-8 text-xs text-gray-400 text-center">
            &copy; 2024 Trueque Inc. Hecho con ❤️ para la comunidad.
        </div>
      </footer>
    </div>
  );
};

export default App;
