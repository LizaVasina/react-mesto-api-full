import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function EditProfilePopup(props) {
    const currentInfo = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentInfo.currentUser.name);
        setDescription(currentInfo.currentUser.about);
    }, [currentInfo.currentUser]);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm 
        name='info'
        title='Редактировать профиль'
        formName='info'
        buttonName='save'
        buttonTitle='Сохранить'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <input id="name" type="text" minLength="2" maxLength="40" autoComplete="off" 
                placeholder="Имя" name="name" className="popup__text popup__text_type_name" required 
                onChange={handleNameChange} value={name ? name : ''}></input>
          <span id="name-error" className="popup__text-error"></span>
          <input id="description" type="text" minLength="2" maxLength="200" autoComplete="off" 
                placeholder="О себе" name="description" className="popup__text popup__text_type_description" required
                onChange={handleDescriptionChange} value={description ? description : ''}></input>
          <span id="description-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;