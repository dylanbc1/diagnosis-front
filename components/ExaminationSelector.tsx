'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CurrentInfo from './CurrentInfo';
import ProgressSteps from './ProgressSteps';

interface Props {
  diagnostico: string;
}

const ExaminationSelector = ({ diagnostico }: Props) => {
  const router = useRouter();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('examen') || '[]');
    if (Array.isArray(storedExams)) setSelectedExams(storedExams);
  }, []);

  const toggleExamSelection = (exam: string) => {
    setSelectedExams((prev) => {
      const updatedExams = prev.includes(exam) 
        ? prev.filter((e) => e !== exam) 
        : [...prev, exam];
      localStorage.setItem('examen', JSON.stringify(updatedExams));
      return updatedExams;
    });
  };

  const handleSubmit = () => {
    router.push('/options/comment')
  };

  const handleBack = () => {
    localStorage.setItem('examen', JSON.stringify([]))
    router.push('/options');
  };

  const examenes_meningitis = [
    { value: 'Punción Lumbar', label: 'Punción Lumbar', description: 'Con análisis del líquido cefalorraquideo' },
    { value: 'Tomografía Computarizada de Cabeza', label: 'Tomografía Computarizada de Cabeza', description: 'Para evitar riesgo de aumento de presión intracraneana' },
    { value: 'AngioTAC', label: 'AngioTAC', description: 'Para visualizar los vasos sanguíneos del cerebro' },
    { value: 'Electrocardiograma', label: 'Electrocardiograma', description: 'Evaluar la actividad eléctrica del corazón' }
  ];  

  const examenes_acv = [
    { value: 'Tomografía Computarizada de Cabeza Sin Contraste', label: 'Tomografía Computarizada de Cabeza Sin Contraste', description: 'Para descartar hemorragias, tumores u otros daños en el parénquima cerebral' },
    { value: 'Resonancia magnética', label: 'Resonancia magnética', description: 'Permite identificar zonas isquémicas en etapas tempranas' },
    { value: 'Electroencefalograma', label: 'Electroencefalograma', description: 'Evaluar la actividad eléctrica del cerebro' },
    { value: 'Test de función cognitiva', label: 'Test de función cognitiva', description: 'Como el Mini-Mental State Examination'}
  ];  

  const examenes_meningioma = [
    { value: 'Resonancia Magnética de Cráneo con Contraste', label: 'Resonancia Magnética de Cráneo con Contraste', description: 'Para visualizar el tumor con detalle'},
    { value: 'Tomografía Computarizada de Cabeza', label: 'Tomografía Computarizada de Cabeza', description: 'Para visualizar cambios en la densidad (masas), clasificaciones, entre otros'},
    { value: 'AngioTAC', label: 'AngioTAC', description: 'Para visualizar los vasos sanguíneos del cerebro' },
    { value: 'Tomografía por Emisión de Positrones (PET)', label: 'Tomografía por Emisión de Positrones (PET)', description: 'Para evaluar la actividad metabólica de los tumores' },
  ]

  const examenes_astrocitoma = [
    { value: 'Resonancia Magnética de Cráneo con Contraste', label: 'Resonancia Magnética de Cráneo con Contraste', description: 'Para visualizar el tumor con detalle'},
    { value: 'Tomografía Computarizada de Cabeza', label: 'Tomografía Computarizada de Cabeza', description: 'Para visualizar cambios en la densidad (masas), clasificaciones, entre otros'},
    { value: 'Biopsia Cerebral', label: 'Biopsia Cerebral', description: 'Para análisis histológico que permite determinar el tipo y grado' },
    { value: 'Análisis de Líquido Cefalorraquídeo', label: 'Análisis de Líquido Cefalorraquídeo', description: 'Buscando alteraciones que sugieran infecciones, enfermedades inflamatorias o metástasis' },
  ]

  const examenes_encefalopatia = [
    { value: 'Tomografía Computarizada de Cabeza Sin Contraste', label: 'Tomografía Computarizada de Cabeza Sin Contraste', description: 'Para descartar hemorragias, tumores u otros daños en el parénquima cerebral' },
    { value: 'Medición de la Presión Arterial', label: 'Medición de la Presión Arterial', description: 'En búsqueda de una crisis hipertensiva'},
    { value: 'Tomografía por Emisión de Positrones (PET)', label: 'Tomografía por Emisión de Positrones (PET)', description: 'Para evaluar la actividad metabólica de los tumores' },
    { value: 'Pruebas de Función Hepática', label: 'Pruebas de Función Hepática', description: 'Para detectar insuficiencia hepática' },
  ]

  const examenes = [
    { value: 'Hemograma', label: 'Hemograma', description: 'Análisis completo de células sanguíneas' },
    { value: 'Electrocardiograma', label: 'Electrocardiograma', description: 'Registro de la actividad eléctrica del corazón' },
    { value: 'Tomografía', label: 'Tomografía', description: 'Imágenes detalladas por secciones' },
    { value: 'Resonancia magnética', label: 'Resonancia magnética', description: 'Imágenes detalladas usando campos magnéticos' },
    { value: 'Pruebas de función hepática', label: 'Pruebas de función hepática', description: 'Evaluación del funcionamiento del hígado' }
  ];

  return (
    <div className="py-8">
      <ProgressSteps currentStep='two'></ProgressSteps>

      <CurrentInfo localStorage_item="diagnostico"/>

      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Selecciona las pruebas diagnósticas a realizar
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {diagnostico == 'ACV' || diagnostico == 'ACV ISQUÉMICO' || diagnostico == 'ACV HEMORRÁGICO' ?
          
          <>
          {examenes_acv.map((exam) => (
            <button
              key={exam.value}
              onClick={() => toggleExamSelection(exam.value)}
              className={`p-6 rounded-xl shadow-sm border transition-all duration-200 text-left hover:bg-blue-50 hover:border-blue-500 
                hover:shadow-md
                ${selectedExams.includes(exam.value) ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-slate-100'}`}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {exam.label}
              </h3>
              <p className="text-sm text-slate-600">
                {exam.description}
              </p>
            </button>
          ))}
          </>
        :
          <>
            {diagnostico == 'MENINGITIS ASÉPTICA' ? 
              <>
                {examenes_meningitis.map((exam) => (
                  <button
                  key={exam.value}
                  onClick={() => toggleExamSelection(exam.value)}
                  className={`p-6 rounded-xl shadow-sm border transition-all duration-200 text-left hover:bg-blue-50 hover:border-blue-500 
                    hover:shadow-md
                    ${selectedExams.includes(exam.value) ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-slate-100'}`}
                    >
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {exam.label}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {exam.description}
                  </p>
                  </button>
                ))}
              </>
            :
                <>
                  {diagnostico == 'MENINGIOMA' ? 
                    <>
                      {examenes_meningioma.map((exam) => (
                        <button
                          key={exam.value}
                          onClick={() => toggleExamSelection(exam.value)}
                          className={`p-6 rounded-xl shadow-sm border transition-all duration-200 text-left hover:bg-blue-50 hover:border-blue-500 
                            hover:shadow-md
                            ${selectedExams.includes(exam.value) ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-slate-100'}`}
                          >
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {exam.label}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {exam.description}
                          </p>
                          </button>
                      ))}
                    </>
                  :
                    <>
                      {diagnostico == 'ASTROCITOMA' ? 
                        <>
                          {examenes_astrocitoma.map((exam) => (
                        <button
                          key={exam.value}
                          onClick={() => toggleExamSelection(exam.value)}
                          className={`p-6 rounded-xl shadow-sm border transition-all duration-200 text-left hover:bg-blue-50 hover:border-blue-500 
                            hover:shadow-md
                            ${selectedExams.includes(exam.value) ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-slate-100'}`}
                          >
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {exam.label}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {exam.description}
                          </p>
                          </button>
                      ))}
                        </>
                      :
                        <>
                          {diagnostico == 'ENCEFALOPATÍA HIPERTENSIVA' ? 
                            <>
                              {examenes_encefalopatia.map((exam) => (
                                <button
                                  key={exam.value}
                                  onClick={() => toggleExamSelection(exam.value)}
                                  className={`p-6 rounded-xl shadow-sm border transition-all duration-200 text-left hover:bg-blue-50 hover:border-blue-500 
                                  hover:shadow-md
                                  ${selectedExams.includes(exam.value) ? 'bg-blue-50 border-blue-500 shadow-md' : 'bg-white border-slate-100'}`}
                                >
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                  {exam.label}
                                </h3>
                                <p className="text-sm text-slate-600">
                                  {exam.description}
                                </p>
                                </button>
                              ))}
                            </>
                          :
                            <>
                            </>
                          }
                        </>
                      }
                    </>
                  }
                </>
            }
          </>
        }
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-white rounded-xl shadow-sm border border-blue-500 
                   hover:shadow-md transition-all duration-200 text-blue-600 font-semibold
                   min-w-[200px]"
        >
          Volver a diagnósticos
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={selectedExams.length === 0}
          className="px-6 py-3 bg-blue-500 rounded-xl shadow-sm hover:bg-blue-600 hover:shadow-md
                   transition-all duration-200 text-white font-semibold min-w-[200px]
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ExaminationSelector;
