import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CadastroForm from './components/Cadastro/CadastroForm';
import Login from './components/Login/Login';
import Categoria from './components/Categoria/Categoria';
import BestBrowserGames from './components/BestBrowserGames/BestBrowserGames';
import { useState  } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [backgroundImage] = useState('/pagina-de-destino-de-jogos-de-neon-desenhada-a-mao/8084267-editado.jpg');
  
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home backgroundImage={backgroundImage} />}/>
          <Route path="/cadastro" element={<CadastroForm backgroundImage={backgroundImage} />} />
          <Route path="/login" element={<Login backgroundImage={backgroundImage} />} />
          <Route path="/categoria" element={<Categoria backgroundImage={backgroundImage} />} />
          <Route path="/BestBrowserGames" element={<BestBrowserGames backgroundImage={backgroundImage} />} />
        </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;