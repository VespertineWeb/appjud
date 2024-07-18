import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Updates() {
  const router = useRouter();
  const { results } = router.query;
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (results) {
      setUpdates(JSON.parse(results));
    }
  }, [results]);

  return (
    <div>
      <h1>Atualizações de Processos</h1>
      {updates.length === 0 ? (
        <p>Nenhuma atualização encontrada.</p>
      ) : (
        updates.map((update, index) => (
          <div key={index}>
            <h2>Processo: {update.caseNumber}</h2>
            <p>Detalhes da atualização: {update.updateDetails}</p>
          </div>
        ))
      )}
    </div>
  );
}
