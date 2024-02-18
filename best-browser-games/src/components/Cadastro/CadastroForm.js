import React, { useState, useEffect  } from 'react';
import './CadastroForm.css';
import { Link, useLocation } from 'react-router-dom';

const CadastroForm = ({backgroundImage}) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  
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
    document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8088488.jpg)`;
    // limpando o estilo do body quando o componente for desmontado
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [backgroundImage]);

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // fazer uma requisição para uma API de cadastro??
    console.log('Dados do formulário:', {
      nomeCompleto,
      email,
      senha,
      dataNascimento,
      estado,
      pais
    });
  };

  return (
    <form className="cadastro-form" onSubmit={handleSubmit}>
      <label>
        Nome Completo:
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
        />
      </label>
      <label>
        E-mail:
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
      <label>
        Data de Nascimento:
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </label>
      <label>
        Estado:
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </label>
      <label>
        País:
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        />
      </label>
      <div className='end'>
        <button type="submit">Cadastrar</button>
        <Link to="/"><button type="" className='back'>Voltar</button></Link>
      </div>
    </form>
  );
};

export default CadastroForm;