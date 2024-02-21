import React, { useState } from 'react';
import './CategoriaForm.css';
import { useToasts } from 'react-toast-notifications';

const CategoriaForm = ({ onCadastrarCategoria }) => {
  const [nomeCategoria, setNomeCategoria] = useState('');
  const { addToast } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomeCategoria.trim()) {
    addToast('Informe o nome da categoria!', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2500 });
    return;
    }
    
    onCadastrarCategoria(nomeCategoria);
    setNomeCategoria('');
  };

  return (
    <form className='categoria-create' onSubmit={handleSubmit}>
      <input
        className='categoria-create'
        type="text"
        placeholder="Nome da Categoria"
        value={nomeCategoria}
        onChange={(e) => setNomeCategoria(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CategoriaForm;
