import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categoria.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import CategoriaForm from './Categoria Form/CategoriaForm';
import { useToasts } from 'react-toast-notifications';

const fetchCategorias = async (setCategorias) => {
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

const Categoria = ({backgroundImage}) => {
    const [categorias, setCategorias] = useState([]);
    const { addToast } = useToasts();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        document.body.classList.add('categoria-page');
        document.body.classList.remove('home-page');
        
        fetchCategorias(setCategorias);
    }, []);
    
    useEffect(() => {
        document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8085528-editado-2.jpg)`;
        
        return () => {
            document.body.style.backgroundImage = 'none';
        };
    }, [backgroundImage]);

    const handleCadastrarCategoria = async (nomeCategoria) => {
        const token = localStorage.getItem('token');
        
        const requestOptions = {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name: nomeCategoria
            })
        };
        
        const response = await fetch('https://api-best-browser-games.vercel.app/categories', requestOptions);
        const data = await response.json();
        addToast(data.message, { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 });

        fetchCategorias(setCategorias);
        console.log('data:', data.message);
    };

    const handleEditarCategoria = async (id) => {
        addToast('Fazer Requisição PUT', { appearance: 'warning' , autoDismiss: true , autoDismissTimeout: 2500 });
    };

    const handleExcluirCategoria = async (id) => {
        addToast('Fazer Requisição DELETE', { appearance: 'warning' , autoDismiss: true , autoDismissTimeout: 2500 });
    };

    return (
        <div className='categoria-form'>
            <h2 className='categoria-title'>Listagem de Categorias</h2>
            <ul className='categoria-list'>
                {categorias.map((categoria) => (
                    <li className='categoria-list' key={categoria._id}>
                        {categoria.name}
                        <div className='categoria-icons'>
                            <FontAwesomeIcon icon={faEdit} style={{ color: '#4ab7da', cursor: 'pointer' }} onClick={() => handleEditarCategoria(categoria._id)} />
                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#ffc05f', cursor: 'pointer' }} onClick={() => handleExcluirCategoria(categoria._id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className='end-categoria'>
                <button onClick={() => setShowForm(!showForm)}>+ Categoria</button>
                <Link to="/"><button type="" className='back'>Voltar</button></Link>
            </div>
            <div className='end-categoriaForm'>
                {showForm && <CategoriaForm onCadastrarCategoria={handleCadastrarCategoria} />}
            </div>
        </div>
    );
};

export default Categoria;
