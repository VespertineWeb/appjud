import React, { useState } from 'react';
import axios from 'axios';

const AdvocatesPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clients, setClients] = useState(['5f8f8c44b54764421b716bd7']); // Exemplo de ID de cliente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/advocates', {
        name,
        phone,
        clients,
      });
      console.log('Advocate created:', response.data);
    } catch (error) {
      console.error('Error creating advocate:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {/* Adicionar campos para clientes conforme necessário */}
      <button type="submit">Create Advocate</button>
    </form>
  );
};

export default AdvocatesPage;
