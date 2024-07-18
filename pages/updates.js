import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get('/api/check-processes');
        setUpdates(response.data);
      } catch (error) {
        console.error('Erro ao buscar atualizações:', error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h1>Atualizações de Processos</h1>
      {updates.length === 0 ? (
        <p>Nenhuma atualização encontrada.</p>
      ) : (
        <ul>
          {updates.map((update, index) => (
            <li key={index}>
              <h2>Processo: {update.caseNumber}</h2>
              <pre>{JSON.stringify(update.updateDetails, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
