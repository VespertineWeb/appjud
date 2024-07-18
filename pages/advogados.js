import React, { useState } from 'react';
import axios from 'axios';

const AdvocatesPage = () => {
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
      {clients.map((client, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Client ID"
            value={client}
            onChange={(e) => handleClientChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addClientField}>
        Add Client
      </button>
      <button type="submit">Create Advocate</button>
    </form>
  );
};

export default AdvocatesPage;
