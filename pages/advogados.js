import { useState } from 'react';
import axios from '../utils/axiosConfig';

export default function Advogados() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clients, setClients] = useState(['']); // Inicialmente um array com um campo vazio

  const handleClientChange = (index, value) => {
    const newClients = [...clients];
    newClients[index] = value;
    setClients(newClients);
  };

  const addClientField = () => {
    setClients([...clients, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando dados:', { name, phone, clients });
    try {
      const response = await axios.post('/api/advocates', { name, phone, clients });
      console.log('Resposta do servidor:', response);
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
        {clients.map((client, index) => (
          <div key={index}>
            <label>Nome do Cliente {index + 1}:</label>
            <input
              type="text"
              value={client}
              onChange={(e) => handleClientChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addClientField}>
          Adicionar Cliente
        </button>
        <button type="submit">Cadastrar Advogado</button>
      </form>
    </div>
  );
}
