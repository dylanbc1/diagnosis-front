import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const sendDiagnosis = async (diagnostico: string, examen: string) => {
  return await axios.post(`${API_URL}/diagnostico`, {
    diagnostico,
    examen,
  });
};
