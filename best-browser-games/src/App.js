import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CadastroForm from './components/Cadastro/CadastroForm';
import { useState  } from 'react';

function App() {

  const [backgroundImage] = useState('/pagina-de-destino-de-jogos-de-neon-desenhada-a-mao/8084267-editado.jpg');
  
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     document.body.classList.add('home-page');
  //     document.body.classList.remove('cadastro-page');
  //   } else if (location.pathname === '/cadastro') {
  //     document.body.classList.add('cadastro-page');
  //     document.body.classList.remove('home-page');
  //   }
  // }, [location.pathname]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home backgroundImage={backgroundImage} />}/>
        <Route path="/cadastro" element={<CadastroForm setBackgroundImage={backgroundImage} />} />
      </Routes>
    </Router>
  );
}

export default App;