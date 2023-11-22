import axios from 'axios';
// const VITE_API_URL = "http://127.0.0.1:8080/"


const api = axios.create({
  baseURL: "https://deployteachcall-production.up.railway.app",
});

export default api;
