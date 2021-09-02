import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    console.log(currentUser);
    console.log(props.card);

    const isOwn = props.card.owner._id === currentUser._id || props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    
    // ПОЧЕМУ ДОБАВЛЯЕТСЯ КНОПКА УДАЛЕНИЯ АХАХХАХАХАХХА
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="card" >
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <button type="button" className="card__popup-button" onClick={handleClick}>
                <img className="card__picture" src={`${props.card.link}`} alt={props.card.name}></img>
            </button>
            <div className="card__description">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-section">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <p className="card__like-number">{props.card.likes.length}</p>
                </div>
            </div>
            </article>
    )
}

export default Card;