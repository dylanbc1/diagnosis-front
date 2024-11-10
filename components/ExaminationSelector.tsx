import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Props {
  diagnostico: string;
}

const ExaminationSelector = ({ diagnostico }: Props) => {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState('');

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExam(e.target.value);
    localStorage.setItem('examen', e.target.value);
  };

  const handleSubmit = async () => {
    const grupo = localStorage.getItem('grupo');
    const examen = localStorage.getItem('examen');

    try {
      await axios.post('http://localhost:8000/api/v1/diagnostico', {
        grupo,
        diagnostico,
        examen,
      });
      alert('Respuesta enviada con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    router.push('/options');
  };

  const examenes = [
    { value: 'Hemograma', label: 'Hemograma', description: 'Análisis completo de células sanguíneas' },
    { value: 'Electrocardiograma', label: 'Electrocardiograma', description: 'Registro de la actividad eléctrica del corazón' },
    { value: 'Tomografía', label: 'Tomografía', description: 'Imágenes detalladas por secciones' },
    { value: 'Resonancia magnética', label: 'Resonancia magnética', description: 'Imágenes detalladas usando campos magnéticos' },
    { value: 'Pruebas de función hepática', label: 'Pruebas de función hepática', description: 'Evaluación del funcionamiento del hígado' }
  ];

  return (
    <div className="py-8">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              1
            </div>
            <div className="ml-2 text-blue-500 font-semibold">Diagnóstico</div>
          </div>
          <div className="w-16 h-0.5 bg-blue-500" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold border-4 border-blue-100">
              2
            </div>
            <div className="ml-2 text-blue-500 font-semibold">Examen</div>
          </div>
        </div>
      </div>

      {/* Current Selection Info */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-center text-blue-800">
            Diagnóstico seleccionado: <span className="font-semibold">{diagnostico}</span>
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Selecciona el examen a realizar
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {examenes.map((exam) => (
            <button
              key={exam.value}
              onClick={() => {
                setSelectedExam(exam.value);
                localStorage.setItem('examen', exam.value);
              }}
              className={`p-6 rounded-xl shadow-sm border
                       transition-all duration-200 text-left hover:border-blue-500 hover:shadow-md hover:bg-blue-50
                       ${selectedExam === exam.value 
                         ? 'bg-blue-50 border-blue-500 shadow-md ' 
                         : 'bg-white border-slate-100 hover:border-blue-500 hover:shadow-md'
                       }`}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {exam.label}
              </h3>
              <p className="text-sm text-slate-600">
                {exam.description}
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white rounded-xl shadow-sm border border-blue-500 
                     hover:shadow-md
                     transition-all duration-200 text-blue-600 font-semibold
                     min-w-[200px]"
          >
            Volver a diagnósticos
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!selectedExam}
            className="px-6 py-3 bg-blue-500 rounded-xl shadow-sm
                     hover:bg-blue-600 hover:shadow-md
                     transition-all duration-200 text-white font-semibold
                     min-w-[200px]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-blue-500 disabled:hover:shadow-sm"
          >
            Enviar Respuesta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExaminationSelector;