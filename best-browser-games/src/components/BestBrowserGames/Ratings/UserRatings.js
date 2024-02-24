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

            // console.log('user id: ', decodedToken.id);

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

        // Lógica para enviar a pontuação e descrição para a API
        console.log('ID do Jogo:', game._id);
        console.log('Pontuação:', localScore);
        console.log('Descrição:', localDescription);

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
            <div>
                <h3>Suas Avaliações:</h3>
                {userRatings.map((rating, index) => (
                    <div key={index}>
                        <p>Score: {rating.score}</p>
                        <p>Descrição: {rating.description}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h3>Avalie:</h3>
                {/* Usar react-star-ratings para criar uma interface de avaliação com barras de estrelas */}
                <ReactStarRatings
                    rating={localScore}
                    changeRating={handleRatingChange}
                    numberOfStars={5}
                    starRatedColor="#ffd700"
                    starHoverColor="#ffd700"
                    starDimension="30px"
                    starSpacing="5px"
                />
                <textarea
                    value={localDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Digite sua descrição..."
                />
                <button onClick={handleSubmitRating}>Enviar Avaliação</button>
            </div>
        );
    }
};

export default UserRatings;
