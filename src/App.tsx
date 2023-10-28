import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';
import { UserAuthProvider } from './context/UserAuthContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <UserAuthProvider>
        <AppRouter />
      </UserAuthProvider>
    </BrowserRouter>
  );
}

export default App;
