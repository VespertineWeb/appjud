import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig'; // Importando a configuração do Axios

export default function Atualizacoes() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('/api/updates');
        setUpdates(response.data);
      } catch (error) {
        console.error('Erro ao buscar atualizações:', error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h1>Atualizações dos Processos</h1>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>
            <p>Processo: {update.caseNumber}</p>
            <p>Atualização: {update.updateDetails}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
