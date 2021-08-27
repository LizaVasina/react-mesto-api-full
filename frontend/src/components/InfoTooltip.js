import React from 'react';
import SuccessInfoImage from '../images/info-icons/success.svg';
import FailInfoImage from '../images/info-icons/fail.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup infotooltip ${props.isOpen ? "popup_opened" : ''}`}>
            <div className="popup__container infotooltip__container">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <img className="infotooltip__picture" src={props.popupStatus ? SuccessInfoImage : FailInfoImage} alt="Информационная иконка"></img>
                <h2 className="popup__title infotooltip__title">
                    {props.popupStatus ? 
                        `Вы успешно ${props.action}!`
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
};

export default InfoTooltip;