import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = ({ backgroundImage }) => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('home-page');
      document.body.classList.remove('cadastro-page');
    } else if (location.pathname === '/cadastro') {
      document.body.classList.add('cadastro-page');
      document.body.classList.remove('home-page');
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    // limpando o estilo do body quando o componente for desmontado
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [backgroundImage]);

  return (
    <div className="home">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/cadastro">Cadastrar</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <h1>Bem-vindo ao BestBrowserGames</h1>
    </div>
  );
};

export default Home;