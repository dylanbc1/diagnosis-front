'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DiagnosticoOpciones() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [expandedACV, setExpandedACV] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem('diagnostico', option.toUpperCase());
    router.push(`/options/test`);
  };

  const toggleACVExpansion = () => setExpandedACV(!expandedACV);

  const diagnosticos = [
    //{ id: 'acv', label: 'ACV', description: 'Ataque Cerebrovascular' },
    { id: 'ACV Isquémico', label: 'ACV Isquémico', description: 'Ataque Cerebrovascular', parent: 'acv' },
    { id: 'ACV Hemorrágico', label: 'ACV Hemorrágico', description: 'Ataque Cerebrovascular', parent: 'acv' },
    { id: 'Meningitis Aséptica', label: 'Meningitis Aséptica', description: 'Infección de S.N.C.' },
    { id: 'Astrocitoma', label: 'Astrocitoma', description: 'Tumor Cerebral' },
    { id: 'Meningioma', label: 'Meningioma', description: 'Tumor Cerebral' },
    { id: 'Encefalopatía Hipertensiva', label: 'Encefalopatía Hipertensiva', description: 'Crisis Hipertensiva con Encefalopatía' },
    { id: 'Otra', label: 'Otra opción', description: 'Especificar otro diagnóstico' },
  ];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Selecciona un diagnóstico etiológico
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnosticos
            .map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  option.id === 'acv' ? toggleACVExpansion() : handleOptionSelect(option.id)
                }
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
