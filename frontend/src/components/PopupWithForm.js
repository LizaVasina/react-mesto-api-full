import React from 'react';

function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ''}`}>
            <div className="popup__container">
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className={`popup__form popup__form_type_${props.name}`} 
                    name={`Popup-form-${props.formName}`} method="post" 
                    onSubmit={props.onSubmit} noValidate>
                {props.children}
                <button type="submit" className={`popup__button popup__button_type_${props.buttonName}`}>{props.buttonTitle}</button>
            </form>
            </div>
        </div>
    );
}

export default PopupWithForm;