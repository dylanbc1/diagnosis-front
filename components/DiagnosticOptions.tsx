import { useRouter, useSearchParams } from 'next/navigation';
import ExaminationSelector from '@/components/ExaminationSelector';
import { useState } from 'react';

export default function DiagnosticoOpciones() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diagnostico = searchParams.get('diagnostico');
  const [examen, setExamen] = useState('');

  const handleBack = () => router.push('/');

  const handleSubmit = () => {
    // Lógica de envío a la API
  };

  if (diagnostico === 'DM3' || diagnostico === 'DM4') {
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg text-red-600 mb-4">Ups... Piénsalo mejor doc</p>
        <button onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded">
          Volver a Opciones
        </button>
      </div>
    );
  } else if (diagnostico === 'Otra...') {
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Escribe otro diagnóstico"
          rows={3}
        />
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Escribe el examen"
          rows={3}
          onChange={(e) => setExamen(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded">
          Enviar Respuesta
        </button>
      </div>
    );
  }

  return <ExaminationSelector diagnostico={diagnostico as string} />;
}
