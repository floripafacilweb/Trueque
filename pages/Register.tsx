
import React, { useState } from 'react';
import { User, PlanType } from '../types';

interface RegisterProps {
  onRegister: (userData: Partial<User>) => void;
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    neighborhood: '',
    city: '',
    province: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({
      ...formData,
      plan: PlanType.BASIC, // Default plan, can be changed in next step
      isAdmin: false
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crea tu cuenta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <input 
            type="text" 
            required
            className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            required
            className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
            <input 
              type="text" 
              required
              className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              value={formData.province}
              onChange={(e) => setFormData({...formData, province: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input 
              type="text" 
              required
              className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Barrio</label>
          <input 
            type="text" 
            required
            className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            value={formData.neighborhood}
            onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            required
            className="w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold h-12 rounded-lg hover:bg-blue-700 transition shadow-md mt-4"
        >
          Crear cuenta
        </button>
      </form>
      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-sm text-gray-500">
          ¿Ya tienes cuenta? <button onClick={() => onNavigate('login')} className="text-blue-600 font-bold">Ingresa</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
