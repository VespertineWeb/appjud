import { useState } from 'react';
import axios from '../utils/axiosConfig'; // Importando a configuração do Axios

export default function Advogados() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clients, setClients] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/advocates', { name, phone, clients });
      alert('Advogado cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar advogado:', error);
      alert('Erro ao cadastrar advogado');
    }
  };

  return (
    <div>
      <h1>Cadastro de Advogados</h1>
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
          <label>Clientes:</label>
          <input type="text" value={clients} onChange={(e) => setClients(e.target.value.split(','))} />
        </div>
        <button type="submit">Cadastrar Advogado</button>
      </form>
    </div>
  );
}
