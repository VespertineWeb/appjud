import { useState } from 'react';
import axios from '../utils/axiosConfig'; // Importando a configuração do Axios

export default function Clientes() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/clients', { name, phone, caseNumber });
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Erro ao cadastrar cliente');
    }
  };

  return (
    <div>
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Número do Processo:</label>
          <input type="text" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
}
