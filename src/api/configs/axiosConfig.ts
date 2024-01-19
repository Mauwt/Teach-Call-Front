import axios from 'axios';

const api = axios.create({
  baseURL: '//3.16.29.76:8080',
});

export default api;
