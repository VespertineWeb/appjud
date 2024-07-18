import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://appjud.vercel.app' : 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
