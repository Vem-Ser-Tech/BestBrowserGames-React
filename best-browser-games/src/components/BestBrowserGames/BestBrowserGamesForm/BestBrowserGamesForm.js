import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, useNavigate } from 'react-router-dom';
import './BestBrowserGamesForm.css';

const BestBrowserGamesForm = ({ backgroundImage }) => {
    const { addToast } = useToasts();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        url: '',
        imageURL: '',
        videoURL: ''
    });

    // Função para obter as categorias disponíveis da API
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://api-best-browser-games.vercel.app/categories');
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error.message);
        }
    };

    useEffect(() => {
        fetchCategories();
        document.body.classList.remove('browserGames-page');      
        document.body.classList.add('BestBrowserGamesForm-page');
        
    }, []);

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
                body: JSON.stringify({
                    ...formData,
                    category: categories.find(cat => cat.name === formData.category)?._id 
                    // tive que transformar em um select com as options sendo as categorias cadastradas
                    // Mapeando o nome da categoria selecionada com o ID correspondente
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar Browser Game');
            }

            const data = await response.json();
            addToast(data.message, { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 });

            setFormData({
                name: '',
                category: '',
                description: '',
                url: '',
                imageURL: '',
                videoURL: ''
            });

            navigate('/BestBrowserGames');

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
        document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8085528-editado-2.jpg)`;
        
        return () => {
            document.body.style.backgroundImage = 'none';
        };
    }, [backgroundImage]); 

    return (
        <div className='BestBrowserGamesForm'>
            <h2 className='BrowserGames-title'>Cadastrar Browser Games</h2>
            <form className='BestBrowserGamesForm' onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>

                <label>
                    Categoria:
                    <select className='BestBrowserGamesForm' name="category" value={formData.category} onChange={handleChange}>
                        <option className='BestBrowserGamesForm' value="">Selecione a categoria</option>
                        {categories.map(cat => (
                            <option className='BestBrowserGamesForm' key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
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
                
                <div className='end-browserGames'>                
                    <button type="submit">Cadastrar</button>
                    <Link to="/BestBrowserGames"><button type="" className='back'>Voltar</button></Link>
                </div>
            </form>
        </div>
    );
};

export default BestBrowserGamesForm;
