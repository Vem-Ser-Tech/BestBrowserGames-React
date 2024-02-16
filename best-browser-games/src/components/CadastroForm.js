import React, { useState } from 'react';
import './CadastroForm.css';

const CadastroForm = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');

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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroForm;