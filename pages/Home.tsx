
import React from 'react';
import { Product, User } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  user: User | null;
  onProductClick: (id: string) => void;
  onPromoteClick: () => void;
}

const Home: React.FC<HomeProps> = ({ products, user, onProductClick, onPromoteClick }) => {
  // Logic: Show featured products from same city first
  const localFeatured = products.filter(p => p.isFeatured && (!user || p.city === user.city));
  const otherFeatured = products.filter(p => p.isFeatured && (user && p.city !== user.city));
  const regular = products.filter(p => !p.isFeatured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-blue-600 rounded-lg p-8 mb-10 flex flex-col md:flex-row items-center justify-between text-white shadow-lg overflow-hidden relative">
        <div className="z-10 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">¿Querés que tu publicación se vea más?</h1>
          <p className="text-lg opacity-90 mb-4">Destacá tus productos por solo $1.000 y llegá a más gente en tu barrio.</p>
          <button 
            onClick={onPromoteClick}
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
          >
            ¡Destacar ahora!
          </button>
        </div>
        <div className="hidden md:block opacity-20 transform rotate-12 -mr-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
             <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.733 4 2.015C12.454 3.733 13.943 3 15.5 3c2.786 0 5.25 2.322 5.25 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
          </svg>
        </div>
      </div>

      {/* Local Featured */}
      {localFeatured.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Destacados cerca de ti {user && <span className="text-sm font-normal text-gray-400">({user.city})</span>}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {localFeatured.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </section>
      )}

      {/* Other Featured */}
      {otherFeatured.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Otros destacados destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherFeatured.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </section>
      )}

      {/* Latest / All */}
      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Últimas publicaciones</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {regular.map(p => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
