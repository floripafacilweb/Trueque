
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className={`bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full ${product.isFeatured ? 'ring-2 ring-blue-500 relative' : ''}`}
      onClick={() => onClick(product.id)}
    >
      {product.isFeatured && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">
          DESTACADO
        </div>
      )}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0] || 'https://picsum.photos/400'} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-1 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">{product.title}</h3>
        <p className="text-xs text-green-600 font-bold mt-2">TRUEQUE DISPONIBLE</p>
        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{product.neighborhood}, {product.city}</p>
        <div className="mt-auto pt-2">
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
