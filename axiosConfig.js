import axios from 'axios';

const api = axios.create({
  baseURL: 'https://techies-amuhacks4-0-2.onrender.com',
  withCredentials: true,
 
});

export default api;
