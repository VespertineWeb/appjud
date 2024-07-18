import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://appjud.vercel.app',
  timeout: 15000, // Aumente o timeout se necessário
});

export default instance;
