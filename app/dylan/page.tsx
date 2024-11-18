'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Answer {
    id: string;
    group: string;
    diagnosis: string;
    exams: string;
    arguments: string;
    professor_name?: string;
}  

export default function Bienvenida() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      const API_URL = 'https://gran-sesion-back.politewater-d3bfd80e.centralus.azurecontainerapps.io/answers';

      try {
        const response = await axios.get<Answer[]>(API_URL);
        setAnswers(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        Bienvenida Mariana, ¿cómo estás el día de hoy?
      </h1>

      {isLoading ? (
        <div className="text-center">
          <p className="text-slate-600">Cargando respuestas...</p>
        </div>
      ) : answers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-500 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {answer.diagnosis}
              </h3>
              <p className="text-sm text-slate-600">
                <strong>Grupo:</strong> {answer.group}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Exámenes:</strong> {answer.exams}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Argumentos:</strong> {answer.arguments}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Profesor:</strong> {answer.professor_name || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-slate-600">No se encontraron respuestas.</p>
        </div>
      )}
    </div>
  );
}
