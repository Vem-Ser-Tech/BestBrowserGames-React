import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Home = ({ backgroundImage }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  //função para verificar se o usuário q está logado é um admin
  const isUserAdmin = () => {
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          console.log(decodedToken.roles.includes('admin'));
          return decodedToken.roles.includes('admin');
      }
      return false;
  };

  //ser admin vai definir se o botão categoria vai ser exibido ou não
  useEffect(() => {
      setIsAdmin(isUserAdmin());
      
      console.log('isAdmin: ',isAdmin);
  }, []);

  useEffect(() => {
    document.body.classList.remove('cadastro-page');
      document.body.classList.remove('login-page');
      document.body.classList.remove('categoria-page');
      document.body.classList.add('home-page');
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/pagina-de-destino-de-jogos-de-neon-desenhada-a-mao/8084267-editado.jpg)`;
    // limpando o estilo do body quando o componente for desmontado
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [backgroundImage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  
    navigate('/login');
  };

  return (
    <div className="home">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/cadastro">
              <button type="">+ Usuário</button>
            </Link>
          </li>
          {isAdmin &&
            <li>
              <Link to="/categoria">
                <button type="">+ Categoria</button>
              </Link>
            </li>
          }
          {!localStorage.getItem('token') && (
            <Link to="/login">
              <button type="">Login</button>
            </Link>
          )}
          <li>
          </li>
          {localStorage.getItem('token') && (
            <li>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Desconectar</Tooltip>} // Tooltip "Desconectar"
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  style={{ color: '#ffc05f', cursor: 'pointer', fontSize: 'xx-large' }}
                  onClick={() => handleLogout()}
                />
              </OverlayTrigger>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;