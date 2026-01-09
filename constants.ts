
import { PlanType } from './types';

export const COLORS = {
  ML_YELLOW: '#FFF159',
  ML_BLUE: '#3483FA',
  ML_GREEN: '#00A650',
  BG_GRAY: '#EDEDED',
};

export const PLANS = [
  {
    type: PlanType.BASIC,
    price: 3000,
    limit: 20,
    description: 'Ideal para quienes empiezan a intercambiar.'
  },
  {
    type: PlanType.MEDIUM,
    price: 5000,
    limit: 40,
    description: 'Perfecto para usuarios recurrentes.'
  },
  {
    type: PlanType.PREMIUM,
    price: 10000,
    limit: Infinity,
    description: 'Publicaciones ilimitadas para los expertos en trueque.'
  }
];

export const CATEGORIES = [
  'Alimentos',
  'Indumentaria',
  'Electrónica',
  'Vehículos',
  'Hogar',
  'Herramientas',
  'Deportes',
  'Otros'
];

export const FEATURED_PRICE = 1000;
