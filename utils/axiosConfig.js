import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://appjud.vercel.app',
  timeout: 10000, // Configure o timeout (em milissegundos)
});

export default instance;
