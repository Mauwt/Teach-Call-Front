import axios from 'axios';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/review/all/prueba4@mail.com?page=0&size=5',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmE0QG1haWwuY29tIiwicm9sZSI6IlJPTEVfdGVhY2hlciIsImV4cCI6MTY5OTk3MTE2OCwiaWF0IjoxNjk5OTM1MTY4fQ.F2JYDBG6pMRdvb3KeWjPc74g9ieUUVeidw4jf7jqK18'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});