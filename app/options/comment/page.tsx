'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProgressSteps from '@/components/ProgressSteps';
import CurrentInfo from '@/components/CurrentInfo';

export default function ComentariosAdicionales() {
  const router = useRouter();
  const [comentarios, setComentarios] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [grupo, setGrupo] = useState<string | null>(null);

  const formattedExams = (exams: string | null) => {
    let fExams = "";

    if (exams != null) {
        for (let i = 0; i < exams.length; i++) {
            if (exams[i] != "[" && exams[i] != "]" && exams[i] != "\"") {
                fExams += exams[i]
            }
        }
    }

    return fExams
  }

  useEffect(() => {
    setIsClient(true);
    const storedGrupo = window.localStorage.getItem('grupo');
    setGrupo(storedGrupo);
  }, []);

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentarios(e.target.value);
  };

  const handleSubmit = async () => {
    window.localStorage.setItem('comentarios', comentarios);

    const API_URL = 'https://diagnosis-back.onrender.com/answers';
    
    console.log(`Sending answers to... ${process.env.NEXT_PUBLIC_API_URL}`)
    console.log(`Sending answers to (burnt)... ${API_URL}`)

    try {
      await axios.post(API_URL, {
        group: grupo,
        diagnosis: window.localStorage.getItem('diagnostico'),
        exams: formattedExams(window.localStorage.getItem('examen')),
        arguments: window.localStorage.getItem('comentarios'),
        professor_name: window.localStorage.getItem('profesor') || 'No_Prof'
      });
      alert('Respuesta enviada con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    window.localStorage.setItem('comentarios', '');
    router.push('/options/test');
  };

  // Mostrar estado de carga mientras verificamos si estamos en el cliente
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

  return (
    <div className="py-8">
      <ProgressSteps currentStep='three'></ProgressSteps>

      <CurrentInfo localStorage_item='examen'></CurrentInfo>

      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Justifica de forma breve tu elección
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-6">
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-100 
                     shadow-sm hover:border-blue-500 hover:shadow-md
                     transition-all duration-200 text-slate-600
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Escribe tus argumentos aquí..."
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
            Volver a exámenes
          </button>
            
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-600 rounded-xl shadow-sm
                   hover:bg-blue-700 hover:shadow-md
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
