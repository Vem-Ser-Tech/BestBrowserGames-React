import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categoria.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Categoria = ({backgroundImage}) => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        document.body.classList.add('categoria-page');
        document.body.classList.remove('home-page');
      }, []);
    
      useEffect(() => {
        document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8085528-editado-2.jpg)`;
        
        return () => {
          document.body.style.backgroundImage = 'none';
        };
      }, [backgroundImage]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://api-best-browser-games.vercel.app/categories');
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias');
                }
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Erro:', error.message);
            }
        };
        fetchCategorias();
    }, []);

    const handleExcluirCategoria = async (id) => {
        try {
            const response = await fetch(`https://api-best-browser-games.vercel.app/categories/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir categoria');
            }
            setCategorias(categorias.filter((categoria) => categoria._id !== id));
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    return (
        <div className='categoria-form'>
            <h2 className='categoria-title'>Listagem de Categorias</h2>
            <ul className='categoria-list'>
                {categorias.map((categoria) => (
                    <li className='categoria-list' key={categoria._id}>
                        {categoria.name}
                        <div className='categoria-icons'>
                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#ffc05f', cursor: 'pointer' }} onClick={() => handleExcluirCategoria(categoria._id)} />
                            <FontAwesomeIcon icon={faEdit} style={{ color: '#4ab7da', cursor: 'pointer' }} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className='end-categoria'>
                <button type="submit">+ Categoria</button>
                <Link to="/"><button type="" className='back'>Voltar</button></Link>
            </div>
        </div>
    );
};

export default Categoria;
