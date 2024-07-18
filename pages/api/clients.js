import dbConnect from '../../utils/dbConnect';
import Client from '../../models/Client';

export default async function handler(req, res) {
  console.log('Connecting to database...');
  await dbConnect();
  console.log('Database connected.');

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        // Log para verificar os dados recebidos
        console.log('Request body:', req.body);
        
        const client = await Client.create(req.body);
        res.status(201).json({ success: true, data: client });
      } catch (error) {
        // Log para capturar detalhes adicionais do erro
        console.error('Error creating client:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
