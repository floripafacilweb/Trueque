
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (u: User) => void;
  users: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin override login
    if (email === 'sergiolfabio1981@gmail.com' && password === 'Colo1981') {
        const admin = users.find(u => u.isAdmin);
        if (admin) onLogin(admin);
        return;
    }

    const found = users.find(u => u.email === email);
    if (found) {
      onLogin(found);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">¡Hola! Ingresa tu email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full h-12 px-4 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input 
            type="password" 
            className="w-full h-12 px-4 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold h-12 rounded hover:bg-blue-700 transition"
        >
          Continuar
        </button>
      </form>
      <div className="mt-8 text-center text-xs text-gray-400 bg-gray-50 p-4 rounded">
        <p className="mb-2">Prueba con los datos solicitados:</p>
        <p className="font-mono">sergiolfabio1981@gmail.com / Colo1981</p>
      </div>
    </div>
  );
};

export default Login;
