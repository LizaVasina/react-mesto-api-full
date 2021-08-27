import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
      }, [props.isOpen])

    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }

    function handleCardLinkChange(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: cardName,
            link: cardLink
        });
    }

    return (
        <PopupWithForm 
        name='photos'
        title='Новое место'
        formName='photos'
        buttonName='create'
        buttonTitle='Создать'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <input id="pic-name" type="text" minLength="2" maxLength="30" 
                placeholder="Имя" name="name" className="popup__text popup__text_type_pic-name" 
                onChange={handleCardNameChange} value={cardName ? cardName : ''} required></input>
          <span id="pic-name-error" className="popup__text-error"></span>
          <input id="link" type="url" placeholder="Ссылка на картинку" 
                name="link" className="popup__text popup__text_type_link" 
                onChange={handleCardLinkChange} value={cardLink ? cardLink : ''} required></input>
          <span id="link-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;