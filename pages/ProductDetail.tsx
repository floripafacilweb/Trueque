
import React, { useState } from 'react';
import { Product, User, TradeOffer } from '../types';

interface ProductDetailProps {
  product: Product;
  currentUser: User | null;
  owner: User | null;
  onMakeOffer: (offeredIds: string[]) => void;
  userProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, currentUser, owner, onMakeOffer, userProducts }) => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleOfferSubmit = () => {
    if (selectedProductIds.length === 0) {
      alert('Debes seleccionar al menos un producto para ofrecer.');
      return;
    }
    onMakeOffer(selectedProductIds);
    setIsOfferModalOpen(false);
  };

  const toggleSelection = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row gap-8 p-6">
        {/* Images */}
        <div className="md:w-3/5">
          <div className="aspect-square bg-gray-50 rounded border border-gray-100 overflow-hidden mb-4">
            <img 
              src={product.images[0] || 'https://picsum.photos/800'} 
              alt={product.title} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <div key={i} className="w-16 h-16 border rounded overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-2/5 flex flex-col">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{product.category}</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.title}</h1>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h2 className="text-blue-800 font-bold mb-1">Lo que el usuario busca a cambio:</h2>
            <p className="text-blue-900">{product.exchangeFor}</p>
          </div>

          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-gray-500 mb-1">Ubicación</p>
            <p className="font-semibold">{product.neighborhood}, {product.city}, {product.province}</p>
          </div>

          <div className="mt-8 space-y-3">
            {!currentUser ? (
              <p className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded border">Inicia sesión para proponer un trueque</p>
            ) : currentUser.id === product.userId ? (
              <p className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded border">Esta es tu publicación</p>
            ) : (
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Proponer Trueque
              </button>
            )}
            <p className="text-center text-xs text-gray-400 italic">No se permiten datos de contacto en la descripción. Estos solo se revelarán si el trueque es aceptado.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Descripción</h2>
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {product.description}
        </div>
      </div>

      {/* Offer Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">¿Qué ofreces a cambio?</h3>
              <button onClick={() => setIsOfferModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {userProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No tienes productos publicados para ofrecer.</p>
                  <button className="text-blue-600 font-bold underline">Publicar algo ahora</button>
                </div>
              ) : (
                userProducts.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => toggleSelection(p.id)}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition ${selectedProductIds.includes(p.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                  >
                    <img src={p.images[0]} className="w-12 h-12 object-cover rounded" />
                    <span className="font-medium flex-1">{p.title}</span>
                    <input 
                      type="checkbox" 
                      checked={selectedProductIds.includes(p.id)} 
                      onChange={() => {}} 
                      className="w-5 h-5 accent-blue-600"
                    />
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex gap-4">
              <button 
                onClick={() => setIsOfferModalOpen(false)}
                className="flex-1 py-2 font-bold text-gray-500 border rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleOfferSubmit}
                disabled={selectedProductIds.length === 0}
                className={`flex-1 py-2 font-bold text-white rounded transition ${selectedProductIds.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Enviar Oferta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
