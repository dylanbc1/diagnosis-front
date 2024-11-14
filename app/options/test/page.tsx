'use client'
import { useRouter } from 'next/navigation';
import ExaminationSelector from '@/components/ExaminationSelector';
import { useEffect, useState } from 'react';
import ProgressSteps from '@/components/ProgressSteps';

export default function NextStepPage() {
  const router = useRouter();
  const [diagnostico, setDiagnostico] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    diagnostico: '',
    examen: ''
  });

  useEffect(() => {
    setIsClient(true);
    // Solo accedemos a localStorage después de confirmar que estamos en el cliente
    const storedDiagnostico = window.localStorage.getItem('diagnostico');
    setDiagnostico(storedDiagnostico);
  }, []);

  const handleSubmit = () => {
    if (formData.diagnostico.trim() && formData.examen.trim()) {
      window.localStorage.setItem('examen', formData.examen.toUpperCase());
      router.push('/options/comment');
    }
  };

  const handleBack = () => {
    router.push('/options');
  };

  // Renderizar un estado de carga mientras verificamos si estamos en el cliente
  if (!isClient) {
    return (
      <div className="py-8 flex justify-center">
        <div className="max-w-lg mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 text-center">
            <p className="text-slate-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (diagnostico === 'DM3' || diagnostico === 'DM4') {
    return (
      <div className="py-8">
        <div className="max-w-lg mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-red-100
                         text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              ¡Momento de reflexión!
            </h2>
            <p className="text-slate-600 mb-6">
              Considera revisar nuevamente el caso clínico. Esta opción podría requerir una evaluación más detallada.
            </p>
            <button 
              onClick={handleBack}
              className="w-full px-6 py-3 bg-white rounded-xl shadow-sm border
                       border-blue-500 hover:shadow-md
                       transition-all duration-200 text-blue-600 font-semibold"
            >
              Volver a diagnósticos
            </button>
          </div>
        </div>
      </div>
    );
  } 
  
  if (diagnostico === 'OTRA') {
    return (
      <div className="py-8">
        <ProgressSteps currentStep='two'></ProgressSteps>

        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Especificar Diagnóstico
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-6">
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-2">
                Diagnóstico Propuesto
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-slate-100 
                         shadow-sm hover:border-blue-500 hover:shadow-md
                         transition-all duration-200 text-slate-600
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe el diagnóstico que consideras apropiado..."
                rows={3}
                value={formData.diagnostico}
                onChange={(e) => setFormData(prev => ({...prev, diagnostico: e.target.value}))}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-2">
                Examen Sugerido
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-slate-100 
                         shadow-sm hover:border-blue-500 hover:shadow-md
                         transition-all duration-200 text-slate-600
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describe el examen que recomendarías..."
                rows={3}
                value={formData.examen}
                onChange={(e) => setFormData(prev => ({...prev, examen: e.target.value}))}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-white rounded-xl shadow-sm border
                         border-blue-500 hover:shadow-md
                         transition-all duration-200 text-blue-600 font-semibold"
              >
                Volver a diagnósticos
              </button>
              
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-blue-600 rounded-xl shadow-sm
                       hover:bg-blue-800 hover:shadow-md
                       transition-all duration-200 text-white font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:bg-blue-500 disabled:hover:shadow-sm"
                disabled={!formData.diagnostico.trim() || !formData.examen.trim()}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ExaminationSelector diagnostico={diagnostico as string} />;
}