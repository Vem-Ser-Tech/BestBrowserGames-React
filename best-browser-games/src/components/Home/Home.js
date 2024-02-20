import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = ({ backgroundImage }) => {

  useEffect(() => {
    document.body.classList.remove('cadastro-page');
      document.body.classList.remove('login-page');
      document.body.classList.add('home-page');
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/pagina-de-destino-de-jogos-de-neon-desenhada-a-mao/8084267-editado.jpg)`;
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
            <Link to="/cadastro">
              <button type="">Cadastrar</button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button type="">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;