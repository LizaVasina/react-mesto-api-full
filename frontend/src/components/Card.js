import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    let currentCard;

    if (props.card.data) {
        currentCard = props.card.data;
    } else {
        currentCard = props.card;
    }
    const isOwn = currentCard.owner._id === currentUser._id;
    const isLiked = currentCard.likes.some(i => i._id === currentUser._id);
    
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(currentCard);
    }

    function handleLikeClick() {
        props.onCardLike(currentCard);
    }

    function handlrDeleteClick() {
        props.onCardDelete(currentCard);
    }

    return (
        <article className="card" >
            <button type="button" className={cardDeleteButtonClassName} onClick={handlrDeleteClick}></button>
            <button type="button" className="card__popup-button" onClick={handleClick}>
                <img className="card__picture" src={`${currentCard.link}`} alt={currentCard.name}></img>
            </button>
            <div className="card__description">
                <h2 className="card__title">{currentCard.name}</h2>
                <div className="card__like-section">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <p className="card__like-number">{currentCard.likes.length}</p>
                </div>
            </div>
            </article>
    )
}

export default Card;