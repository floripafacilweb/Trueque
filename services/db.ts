
import { User, Product, TradeOffer, Payment, PlanType } from '../types';

const INITIAL_USERS: User[] = [
  {
    id: 'admin-1',
    email: 'sergiolfabio1981@gmail.com',
    name: 'Sergio Admin',
    neighborhood: 'Palermo',
    city: 'CABA',
    province: 'Buenos Aires',
    plan: PlanType.PREMIUM,
    isAdmin: true,
    phone: '1122334455'
  },
  {
    id: 'user-1',
    email: 'juan@example.com',
    name: 'Juan Pérez',
    neighborhood: 'Centro',
    city: 'Rosario',
    province: 'Santa Fe',
    plan: PlanType.BASIC,
    isAdmin: false,
    phone: '3415556677'
  }
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    userId: 'user-1',
    title: 'Bicicleta Mountain Bike R29',
    description: 'Bicicleta en excelente estado, frenos a disco.',
    category: 'Deportes',
    neighborhood: 'Centro',
    city: 'Rosario',
    province: 'Santa Fe',
    isFeatured: true,
    featuredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['https://picsum.photos/seed/bike/400/300'],
    exchangeFor: 'Me interesa una PlayStation 4 o TV 50 pulgadas',
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    userId: 'admin-1',
    title: 'Paquete de fideos 500g',
    description: 'Fideos tipo tallarín, marca reconocida.',
    category: 'Alimentos',
    neighborhood: 'Palermo',
    city: 'CABA',
    province: 'Buenos Aires',
    isFeatured: false,
    images: ['https://picsum.photos/seed/pasta/400/300'],
    exchangeFor: 'Cambio por arroz o lentejas',
    createdAt: new Date().toISOString()
  }
];

class DB {
  private get(key: string) {
    const data = localStorage.getItem(`trueque_${key}`);
    return data ? JSON.parse(data) : null;
  }

  private set(key: string, value: any) {
    localStorage.setItem(`trueque_${key}`, JSON.stringify(value));
  }

  init() {
    if (!this.get('users')) this.set('users', INITIAL_USERS);
    if (!this.get('products')) this.set('products', INITIAL_PRODUCTS);
    if (!this.get('offers')) this.set('offers', []);
    if (!this.get('payments')) this.set('payments', []);
  }

  getUsers(): User[] { return this.get('users') || []; }
  getProducts(): Product[] { return this.get('products') || []; }
  getOffers(): TradeOffer[] { return this.get('offers') || []; }
  getPayments(): Payment[] { return this.get('payments') || []; }

  saveUser(user: User) {
    const users = this.getUsers();
    this.set('users', [...users.filter(u => u.id !== user.id), user]);
  }

  saveProduct(product: Product) {
    const products = this.getProducts();
    this.set('products', [...products.filter(p => p.id !== product.id), product]);
  }

  saveOffer(offer: TradeOffer) {
    const offers = this.getOffers();
    this.set('offers', [...offers, offer]);
  }

  updateOfferStatus(offerId: string, status: 'accepted' | 'rejected') {
    const offers = this.getOffers();
    const updated = offers.map(o => o.id === offerId ? { ...o, status } : o);
    this.set('offers', updated);
  }

  savePayment(payment: Payment) {
    const payments = this.getPayments();
    this.set('payments', [...payments, payment]);
  }
}

export const db = new DB();
