import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BestBrowserGames.css';

const fetchBrowserGames = async (setBrowserGames) => {
    try {
        const response = await fetch('https://api-best-browser-games.vercel.app/games');
        if (!response.ok) {
            throw new Error('Erro ao buscar Browser Games');
        }
        const data = await response.json();
        setBrowserGames(data);
    } catch (error) {
        console.error('Erro:', error.message);
    }
};

const BestBrowserGames = ({ backgroundImage }) => {
    const [browserGames, setBrowserGames] = useState([]);
    const { addToast } = useToasts();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        document.body.classList.add('browserGames-page');
        document.body.classList.remove('home-page');
        
        fetchBrowserGames(setBrowserGames);
    }, []);

    useEffect(() => {
        document.body.style.backgroundImage = `url(/photocall-de-jogos-de-neon-desenhado-a-mao/8085528-editado-2.jpg)`;
        
        return () => {
            document.body.style.backgroundImage = 'none';
        };
    }, [backgroundImage]);

    const handleEditarBrowserGames = async (id) => {
        addToast('Fazer Requisição PUT', { appearance: 'warning' , autoDismiss: true , autoDismissTimeout: 2500 });
    };

    const handleExcluirBrowserGames = async (id) => {
        addToast('Fazer Requisição DELETE', { appearance: 'warning' , autoDismiss: true , autoDismissTimeout: 2500 });
    };

    return (
        <div className='BrowserGames'>
            <h2 className='BrowserGames-title'>Listagem de Browser Games</h2>
            <ul className='BrowserGames-list'>
                {browserGames.map((game) => (
                    <li className='BrowserGames-list' key={game._id}>
                        <div className='BrowserGames-header'>
                            <div><strong>Nome:</strong> {game.name}<br /></div>
                                                        
                            <div className='BrowserGames-icons'>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Editar</Tooltip>} 
                                >
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{ color: '#4ab7da', cursor: 'pointer' }}
                                        onClick={() => handleEditarBrowserGames(game._id)}
                                    />
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Excluir</Tooltip>} 
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={{ color: '#ffc05f', cursor: 'pointer' }}
                                        onClick={() => handleExcluirBrowserGames(game._id)}
                                    />
                                </OverlayTrigger>                                
                            </div>
                        </div>

                        <strong>Categoria:</strong> {game.category.name}<br />
                        <strong>URL de acesso ao jogo:</strong> <a href={game.url}>{game.url}</a><br />
                        <strong>URL do vídeo de demonstração:</strong> {game.videoURL && <a href={game.videoURL}>{game.videoURL}</a>}<br />
                        <strong>Descrição:</strong> {game.description}<br />
                        <div className='BrowserGames-img'>
                            <img src={game.imageURL} alt={game.name} style={{ maxWidth: '200px' }} /><br />
                        </div>
                    </li>
                ))}
            </ul>
            <div className='end-browserGames'>
                <li>
                    <Link to="/BestBrowserGamesForm">
                        <button type="">+ Browser Game</button>
                    </Link>
                </li>
                <Link to="/"><button type="" className='back'>Voltar</button></Link>
            </div>
            <div className='end-browserGamesList'>
                {/* {showForm && </>} */}
            </div>
        </div>
    );
};

export default BestBrowserGames;
