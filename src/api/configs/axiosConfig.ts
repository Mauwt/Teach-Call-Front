import axios from 'axios';
// const VITE_API_URL = "http://127.0.0.1:8080/"


const api = axios.create({
  baseURL: "https://teahcallback-spring-app-20231122020617.azuremicroservices.io/",
});

export default api;
