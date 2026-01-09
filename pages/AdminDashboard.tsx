
import React, { useState } from 'react';
import { User, Product, Payment, AdminStats, PlanType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  users: User[];
  products: Product[];
  payments: Payment[];
  stats: AdminStats;
  onDeleteProduct: (id: string) => void;
  onVerifyPayment: (id: string) => void;
  onCreateUser: (u: Partial<User>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, products, payments, stats, onDeleteProduct, onVerifyPayment, onCreateUser }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', city: '', plan: PlanType.BASIC });

  const chartData = [
    { name: 'Usuarios', count: users.length },
    { name: 'Productos', count: products.length },
    { name: 'Pagos', count: payments.length },
    { name: 'Ingresos (k)', count: stats.totalRevenue / 1000 },
  ];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser({ ...newUser, isAdmin: false, province: 'Admin-Generated', neighborhood: 'Admin-Generated' });
    setShowUserForm(false);
    setNewUser({ name: '', email: '', city: '', plan: PlanType.BASIC });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Control Admin</h1>
        <button 
          onClick={() => setShowUserForm(!showUserForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-sm"
        >
          {showUserForm ? 'Cerrar Formulario' : '+ Generar Usuario'}
        </button>
      </div>

      {showUserForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold mb-4">Generar Nuevo Usuario</h3>
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              placeholder="Nombre" 
              className="p-2 border rounded" 
              value={newUser.name} 
              onChange={e => setNewUser({...newUser, name: e.target.value})} 
              required 
            />
            <input 
              placeholder="Email" 
              type="email" 
              className="p-2 border rounded" 
              value={newUser.email} 
              onChange={e => setNewUser({...newUser, email: e.target.value})} 
              required 
            />
            <input 
              placeholder="Ciudad" 
              className="p-2 border rounded" 
              value={newUser.city} 
              onChange={e => setNewUser({...newUser, city: e.target.value})} 
              required 
            />
            <select 
              className="p-2 border rounded"
              value={newUser.plan}
              onChange={e => setNewUser({...newUser, plan: e.target.value as PlanType})}
            >
              {Object.values(PlanType).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="submit" className="md:col-span-4 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">
              Crear Usuario
            </button>
          </form>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-400 text-sm font-semibold uppercase">Total Usuarios</p>
          <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-400 text-sm font-semibold uppercase">Ingresos Totales</p>
          <p className="text-3xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <p className="text-gray-400 text-sm font-semibold uppercase">Publicaciones</p>
          <p className="text-3xl font-bold mt-1">{stats.activeProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-gray-400 text-sm font-semibold uppercase">Pagos Verificados</p>
          <p className="text-3xl font-bold mt-1">{payments.filter(p => p.verified).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm h-80">
          <h3 className="font-bold mb-4">Métricas Generales</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3483FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <h3 className="font-bold mb-4">Últimos Pagos por Verificar</h3>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2">Usuario</th>
                  <th className="p-2">Monto</th>
                  <th className="p-2">Concepto</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {payments.filter(p => !p.verified).map(p => {
                    const user = users.find(u => u.id === p.userId);
                    return (
                        <tr key={p.id} className="border-b">
                            <td className="p-2">{user?.name || 'Desconocido'}</td>
                            <td className="p-2 font-bold">${p.amount}</td>
                            <td className="p-2 text-xs uppercase">{p.concept}</td>
                            <td className="p-2">
                                <button 
                                    onClick={() => onVerifyPayment(p.id)}
                                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold hover:bg-green-200"
                                >
                                    Verificar
                                </button>
                            </td>
                        </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold">Gestionar Publicaciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-xs font-bold text-gray-500">
              <tr>
                <th className="p-4">Título</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Ubicación</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {products.map(p => {
                const owner = users.find(u => u.id === p.userId);
                return (
                  <tr key={p.id}>
                    <td className="p-4 font-medium">{p.title}</td>
                    <td className="p-4">{owner?.name || 'Anon'}</td>
                    <td className="p-4">{p.city}, {p.province}</td>
                    <td className="p-4">
                      {p.isFeatured ? (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-[10px] font-bold">DESTACADO</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px]">NORMAL</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => onDeleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
