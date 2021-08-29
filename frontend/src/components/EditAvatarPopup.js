import PopupWithForm from './PopupWithForm.js';
import React from 'react';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm 
        name='edit-avatar'
        title='Обновить аватар'
        formName='avatar'
        buttonName='update'
        buttonTitle='Сохранить'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>
          <input id="avatar" type="url" placeholder="Ссылка на аватар" 
                name="link" className="popup__text popup__text_type_link" 
                ref={avatarRef} required></input>
          <span id="avatar-error" className="popup__text-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;