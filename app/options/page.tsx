'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DiagnosticoOpciones() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem('diagnostico', option);
    router.push(`/options/next-step`);
  };

  const diagnosticos = [
    { id: 'ACV', label: 'ACV', description: 'Accidente Cerebrovascular' },
    { id: 'DM1', label: 'DM1', description: 'Diabetes Mellitus Tipo 1' },
    { id: 'DM2', label: 'DM2', description: 'Diabetes Mellitus Tipo 2' },
    { id: 'DM3', label: 'DM3', description: 'Diabetes Mellitus Tipo 3' },
    { id: 'DM4', label: 'DM4', description: 'Diabetes Mellitus Tipo 4' },
    { id: 'Otra', label: 'Otra opción', description: 'Especificar otro diagnóstico' },
  ];

  return (
    <div className="py-8">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold border-4 border-blue-100">
              1
            </div>
            <div className="ml-2 text-blue-500 font-semibold">Diagnóstico</div>
          </div>
          <div className="w-16 h-0.5 bg-slate-200" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
              2
            </div>
            <div className="ml-2 text-slate-400 font-semibold">Examen</div>
          </div>
        </div>
      </div>

      {/* Current Case Info */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-center text-blue-800">
            Caso Clínico: <span className="font-semibold">{localStorage.getItem('grupo') || 'No seleccionado'}</span>
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Selecciona un diagnóstico
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnosticos.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`p-6 rounded-xl shadow-sm border
                       transition-all duration-200 text-left
                       ${selectedOption === option.id 
                         ? 'bg-blue-50 border-blue-500 shadow-md' 
                         : 'bg-white border-slate-100 hover:border-blue-500 hover:shadow-md hover:bg-blue-50'
                       }`}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {option.label}
              </h3>
              <p className="text-sm text-slate-600">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}