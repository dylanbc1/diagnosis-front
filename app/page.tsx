'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Página inicial mejorada
const HomePage = () => {
  const router = useRouter();
  const [grupo, setGrupo] = useState('');

  const handleGroupChange = (e: any) => {
    setGrupo(e.target.value);
  };

  const handleStart = () => {
    if (grupo) {
      localStorage.setItem('grupo', grupo);
      router.push('/options');
    } else {
      // Toast notification would be better here
      alert('Por favor, selecciona un grupo.');
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Bienvenidos, futuros médicos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Comencemos con la actividad. Por favor, selecciona cuidadosamente tu grupo para evitar confusiones.
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          <select
            className="w-full px-4 py-3 rounded-lg border border-slate-200 
                       shadow-sm transition-colors duration-200
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                       text-slate-600 appearance-none"
            value={grupo}
            onChange={handleGroupChange}
          >
            <option value="" disabled>Seleccione su grupo</option>
            {['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4', 'Grupo 5', 'Grupo 6'].map((g) => (
              <option key={g} value={g.toLowerCase().replace(' ', '')}>{g}</option>
            ))}
          </select>

          <button
            onClick={handleStart}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg
                     font-semibold shadow-md hover:bg-blue-700 
                     transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!grupo}
          >
            Comenzar actividad
          </button>
        </div>
      </div>
  );
};

export default HomePage;