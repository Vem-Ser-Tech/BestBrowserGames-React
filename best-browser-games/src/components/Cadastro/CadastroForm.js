import React, { useState, useEffect  } from 'react';
import './CadastroForm.css';
import { Link, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const CadastroForm = ({backgroundImage}) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const { addToast } = useToasts();
  
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
  const handleSubmit = async (event) => {
    event.preventDefault();    

    //input tipo date traz a data no formato: aaaa-mm-dd, então preciso inverter para: dd-mm-aaaa
    const formattedDate = dataNascimento.split('-').reverse().join('-');

    //removendo - e juntando tudo no formato ddmmaaaa
    const birthday = formattedDate.split('-').join('');

    try {
      const response = await fetch('https://api-best-browser-games.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nomeCompleto,
          email,
          password: senha,
          confirmPassword: senha, // Considerando que a confirmação de senha é igual à senha. Precisamos validar isso
          birthDate: birthday,
          country: pais,
          state: estado,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }
  
      const data = await response.json();
      
      addToast(data.message, { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 }); // 2000 ms = 2 segundos
      
    } catch (error) {
      console.error('Erro:', error.message);
    }
    
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