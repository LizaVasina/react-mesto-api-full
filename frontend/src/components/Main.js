import Card from './Card.js';
import Header from './Header.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    console.log(currentUser.name, 'main');

  return (
    <>
    <Header>
      <div className="header__info">
        <p className="header__email">{props.userData.email}</p>
        <button type="button" onClick={props.onSignOut} className="header__button header__button_place_main-page">Выход</button>
      </div>
    </Header>

    <main className="content">
        <section className="profile">
          <div className="profile__info">
            <span className = "profile__image-wrapper">
              <button type="button" className="profile__edit-avatar-button" onClick={props.onEditAvatarPopup}></button>
              <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Фотография профиля"></img>
            </span>
            <div className="profile__data">
              <div className="profile__text">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__description">{currentUser.about}</p>
              </div>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfilePopup}></button>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlacePopup}></button>
        </section>

        <section className="photo-grid">
          {props.cards ? Array.from(props.cards).map((card) => {
            return (<Card card={card} 
            key={card._id} 
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}/>)
          }) : []}
        </section>
    </main> 

    <Footer></Footer> 

    <EditProfilePopup
      isOpen={props.isEditProfilePopupOpen}
      onClose={props.onClose}
      onUpdateUser={props.onUpdateUser}
    ></EditProfilePopup>

    <EditAvatarPopup
      isOpen={props.isEditAvatarPopupOpen}
      onClose={props.onClose}
      onUpdateAvatar={props.onUpdateAvatar}>
    </EditAvatarPopup>

    <AddPlacePopup
      isOpen={props.isAddPlacePopupOpen}
      onClose={props.onClose}
      onAddPlace={props.onAddPlace}>
    </AddPlacePopup>

    <PopupWithForm 
      name='submit'
      title='Вы уверены?'
      buttonName='submit-action'
      buttonTitle='Да'
      isOpen={props.isSubmitPopupOpen}
      onClose={props.onClose}/>

    <ImagePopup 
      card={props.selectedCard}
      isOpen={props.isImagePopupOpen}
      onClose={props.onClose}
    />

    </>
  );
}
  
export default Main;