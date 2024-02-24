import React, { useState } from 'react';
import ReactStarRatings from 'react-star-ratings';
import { useToasts } from 'react-toast-notifications';

const UserRatings = ({ game, token, fetchGames }) => {   
    const [localScore, setLocalScore] = useState(0);
    const [localDescription, setLocalDescription] = useState('');
    const { addToast } = useToasts();

    const [formData, setFormData] = useState({
        score: '',
        description: '',
        game: '',
        user: ''
    });
    
    const getUserIdFromToken = () => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));

            return decodedToken.id;
        }
        return null;
    };

    const userRatings = game.ratings.filter(rating => rating.user === getUserIdFromToken());

    const handleRatingChange = (newRating) => {
        setLocalScore(newRating);

        setFormData({
            ...formData,
            score: newRating
        });
    };

    const handleDescriptionChange = (event) => {
        setLocalDescription(event.target.value);

        setFormData({
            ...formData,
            description: event.target.value
        });
    };

    
    const handleSubmitRating = async (event) => {
        
        event.preventDefault();

        try {
            const response = await fetch('https://api-best-browser-games.vercel.app/ratings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    game: game._id,
                    user: getUserIdFromToken()
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao avaliar.');
            }

            const data = await response.json();
            addToast(data.message, { appearance: 'success' , autoDismiss: true , autoDismissTimeout: 2500 });

            setLocalScore(0);
            setLocalDescription('');
            setFormData({
                score: '',
                description: '',
                game: '',
                user: ''
            });

            fetchGames();

        } catch (error) {
            addToast(error.message, { appearance: 'error' , autoDismiss: true , autoDismissTimeout: 2500 });
            console.error('Erro:', error.message);
        }
    };


    if (userRatings.length > 0) {
        return (
            <div style={{ color: '#12a7d9', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: '1.5rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3>Visão Geral:</h3>
                    <ReactStarRatings
                        rating={game.score}
                        numberOfStars={5}
                        starRatedColor="#cd45ef"
                        starHoverColor="#cd45ef"
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <div style={{ margin: '1.5rem auto'}}>
                    <h3>Suas Avaliações:</h3>
                    {userRatings.map((rating, index) => (
                        <div key={index} style={{ margin: '1.5rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>Score: {rating.score}</p>
                            <p>Descrição: {rating.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div style={{color: '#12a7d9', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.5rem auto'}}>
                <h3>Avalie:</h3>
                <div style={{ margin: '1.5rem auto' }}>
                    <ReactStarRatings 
                        rating={localScore}
                        changeRating={handleRatingChange}
                        numberOfStars={5}
                        starRatedColor="#ffd700"
                        starHoverColor="#ffd700"
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <textarea
                    value={localDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Digite sua descrição..."
                />
                <button 
                    onClick={handleSubmitRating}
                    style={{
                        backgroundColor: '#afd32c', 
                        display: 'flex', 
                        fontWeight: '700',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        margin: '1.5rem auto',
                        padding: '10px 20px'
                    }}
                >
                        Enviar Avaliação
                </button>
            </div>
        );
    }
};

export default UserRatings;
