import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup pic-popup ${props.isOpen ? "popup_opened" : ''}`}>
            <div className="popup__container popup__container_place_picture">
            <button type="button" className="popup__close-button popup__close-button_place_picture" onClick={props.onClose}></button>
                <img className="pic-popup__image" src={props.isOpen ? props.card.link : ""} alt={props.isOpen ? props.card.name : ""}></img>
                <p className="pic-popup__caption">{props.isOpen ? props.card.name : ""}</p>
            </div>
        </div>
    )
}

export default ImagePopup;