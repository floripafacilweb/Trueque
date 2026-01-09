
import React from 'react';
import { PlanType } from '../types';
import { PLANS } from '../constants';

interface PlansProps {
  onSelectPlan: (plan: PlanType) => void;
  currentPlan?: PlanType;
}

const Plans: React.FC<PlansProps> = ({ onSelectPlan, currentPlan }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Elige tu plan de Trueque</h1>
        <p className="text-gray-500 text-lg">Únete a nuestra comunidad y empieza a intercambiar hoy mismo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div 
            key={plan.type} 
            className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden flex flex-col transition transform hover:scale-105 ${currentPlan === plan.type ? 'border-blue-500 shadow-xl' : 'border-transparent'}`}
          >
            {plan.type === PlanType.PREMIUM && (
              <div className="bg-blue-600 text-white text-center text-xs font-bold py-1 uppercase tracking-widest">
                Recomendado
              </div>
            )}
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold mb-2">{plan.type}</h2>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-black">${plan.price.toLocaleString()}</span>
                <span className="text-gray-400 ml-1">/ mes</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.limit === Infinity ? 'Publicaciones ilimitadas' : `Hasta ${plan.limit} publicaciones`}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Trueques ilimitados
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Soporte 24/7
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 border-t">
              <button 
                onClick={() => onSelectPlan(plan.type)}
                className={`w-full py-3 rounded-lg font-bold transition ${currentPlan === plan.type ? 'bg-gray-200 text-gray-500 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                disabled={currentPlan === plan.type}
              >
                {currentPlan === plan.type ? 'Plan Actual' : 'Seleccionar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
