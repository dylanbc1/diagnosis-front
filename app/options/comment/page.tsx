'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProgressSteps from '@/components/ProgressSteps';
import CurrentInfo from '@/components/CurrentInfo';

export default function ComentariosAdicionales() {
    const router = useRouter();
  const [comentarios, setComentarios] = useState('');

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentarios(e.target.value);
  };

  const handleSubmit = async () => {
    const grupo = localStorage.getItem('grupo');
    localStorage.setItem('comentarios', comentarios);
    try {
      await axios.post('http://localhost:8000/api/v1/diagnostico', {
        grupo: grupo,
        diagnostico: localStorage.getItem('diagnostico'),
        examen: localStorage.getItem('examen'),
        comentarios: localStorage.getItem('comentarios')
      });
      alert('Respuesta enviada con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    localStorage.setItem('comentarios', '');
    router.push('/options/test');
  };

  return (
    <div className="py-8">
        <ProgressSteps currentStep='three'></ProgressSteps>

        <CurrentInfo localStorage_item='examen'></CurrentInfo>

      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Agrega más comentarios y/o argumentos si deseas
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-6">
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-100 
                       shadow-sm hover:border-blue-500 hover:shadow-md
                       transition-all duration-200 text-slate-600
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Escribe tus comentarios adicionales aquí..."
            rows={5}
            value={comentarios}
            onChange={handleComentarioChange}
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
                
                className="flex-1 px-6 py-3 bg-blue-500 rounded-xl shadow-sm
                     hover:bg-blue-600 hover:shadow-md
                     transition-all duration-200 text-white font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-blue-500 disabled:hover:shadow-sm"
              >
                Enviar respuesta
              </button>
            </div>
      </div>
    </div>
  );
}
