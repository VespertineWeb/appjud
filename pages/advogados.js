import React from 'react';
import dbConnect from '../utils/dbConnect';
import Advocate from '../models/Advocate';

export default function AdvocatesPage() {
  return <div>Advocates Page</div>;
}

// Defina aqui a função de data fetching se necessário

export async function getServerSideProps(context) {
  console.log('Connecting to database...');
  await dbConnect();
  console.log('Database connected.');

  // Você pode adicionar aqui qualquer lógica adicional para buscar dados

  return {
    props: {}, // Será passado para o componente AdvocatesPage como props
  };
}
