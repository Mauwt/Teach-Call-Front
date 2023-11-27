import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyecto-final-teachcall-back-production.up.railway.app/',
});

export default api;
