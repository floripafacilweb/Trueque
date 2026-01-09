
import React, { useState } from 'react';
import { User } from '../types';
import { COLORS } from '../constants';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav style={{ backgroundColor: COLORS.ML_YELLOW }} className="w-full pb-2 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex items-center justify-between h-14 gap-4">
          <div 
            className="text-2xl font-bold cursor-pointer text-blue-900 italic" 
            onClick={() => onNavigate('home')}
          >
            Trueque
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca productos por cercanía..."
                className="w-full h-10 px-4 py-2 bg-white rounded shadow-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 text-sm text-gray-700">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:inline">Hola, <b>{user.name}</b></span>
                {user.isAdmin && (
                  <button 
                    onClick={() => onNavigate('admin')}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Admin
                  </button>
                )}
                <button onClick={() => onNavigate('dashboard')} className="hover:underline">Mis Trueques</button>
                <button onClick={onLogout} className="text-red-600 font-semibold">Salir</button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => onNavigate('register')} className="hover:underline">Crea tu cuenta</button>
                <button onClick={() => onNavigate('login')} className="hover:underline">Ingresa</button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mt-1">
          <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
            <button onClick={() => onNavigate('category-alimentos')} className="hover:text-black">Alimentos</button>
            <button onClick={() => onNavigate('category-vehiculos')} className="hover:text-black">Vehículos</button>
            <button onClick={() => onNavigate('category-electronica')} className="hover:text-black">Tecnología</button>
            <button onClick={() => onNavigate('category-indumentaria')} className="hover:text-black">Moda</button>
            <button onClick={() => onNavigate('offers')} className="hover:text-black">Historial</button>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">Plan {user.plan}</span>
              <button 
                onClick={() => onNavigate('plans')} 
                className="text-blue-600 hover:underline"
              >
                Cambiar plan
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
