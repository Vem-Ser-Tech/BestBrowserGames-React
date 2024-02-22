import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './Login.css';

const Login = ({ backgroundImage }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { addToast } = useToasts();

  useEffect(() => {
    document.body.classList.remove('home-page');
    document.body.classList.add('login-page');
    document.body.style.backgroundImage = `url(modelo-de-rotulos-de-jogos-de-neon-desenhados-a-mao/8085528-editado2.jpg)`;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', senha);

    try {
      const response = await fetch('https://api-best-browser-games.vercel.app/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              password: senha
          })
      });
      
      if (!response.ok) {
          throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      const token = data.token;
      console.log(token);

      // Decodificar o token JWT (JSON Web Tokens)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const { roles } = decodedToken;
      console.log(roles[0]);

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      addToast('Login bem-sucedido!', { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 });
      navigate('/');

    } catch (error) {
      addToast(error.message, { appearance: 'error' , autoDismiss: true , autoDismissTimeout: 2500 });

    }

  };

  return (
    <div className="login-form">
        <form onSubmit={handleSubmit} className="login-form">
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Senha:
                <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </label>
            
            <div className='end'>
                <button type="submit">Entrar</button>
                <Link to="/"><button type="" className='back'>Voltar</button></Link>
            </div>
        </form>
    </div>
  );
};

export default Login;
