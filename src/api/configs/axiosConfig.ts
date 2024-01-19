import axios from 'axios';

const api = axios.create({
  baseURL: 'https://oc122xk9kk.execute-api.us-east-2.amazonaws.com/prod',
});

export default api;
