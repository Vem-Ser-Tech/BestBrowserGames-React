import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BestBrowserGamesForm.css';

const BestBrowserGamesForm = ({ backgroundImage }) => {
    const [browserGames, setBrowserGames] = useState([]);
    const { addToast } = useToasts();
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        url: '',
        imageURL: '',
        videoURL: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://api-best-browser-games.vercel.app/games', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar Browser Game');
            }

            const data = await response.json();
            addToast(data.message, { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 });

            console.log('Formulário enviado:', formData);
            console.log('response :', data.message);

            // Limpar o formulário após o sucesso
            setFormData({
                name: '',
                category: '',
                description: '',
                url: '',
                imageURL: '',
                videoURL: ''
            });
        } catch (error) {
            addToast(error.message, { appearance: 'error' , autoDismiss: true , autoDismissTimeout: 2500 });
            console.error('Erro:', error.message);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        document.body.classList.add('BestBrowserGamesForm-page');
        document.body.classList.remove('home-page');
    }, []);

    useEffect(() => {
        document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8085528-editado-2.jpg)`;
        
        return () => {
            document.body.style.backgroundImage = 'none';
        };
    }, [backgroundImage]);

    

    return (
        <div className='BestBrowserGamesForm'>
            <h2 className='BrowserGames-title'>Cadastrar Browser Games</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Categoria:
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </label>
                <label>
                    Descrição:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    URL de acesso ao jogo:
                    <input type="text" name="url" value={formData.url} onChange={handleChange} />
                </label>
                <label>
                    URL do vídeo de demonstração:
                    <input type="text" name="videoURL" value={formData.videoURL} onChange={handleChange} />
                </label>
                <label>
                    Imagem ilustrativa:
                    <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default BestBrowserGamesForm;
