
export enum PlanType {
  BASIC = 'Básico',
  MEDIUM = 'Medio',
  PREMIUM = 'Premium'
}

export interface User {
  id: string;
  name: string;
  email: string;
  neighborhood: string;
  city: string;
  province: string;
  plan: PlanType;
  phone?: string;
  isAdmin: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  neighborhood: string;
  city: string;
  province: string;
  isFeatured: boolean;
  featuredUntil?: string;
  images: string[];
  exchangeFor: string;
  createdAt: string;
}

export interface TradeOffer {
  id: string;
  fromUserId: string;
  toUserId: string;
  targetProductId: string;
  offeredProductIds: string[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  concept: 'subscription' | 'featured';
  date: string;
  verified: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  activeProducts: number;
}
