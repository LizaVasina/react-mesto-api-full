// конфиг для валидации форм
export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__button',
  inactiveButtonState: 'popup__button_invalid',
  inputErrorClass: 'popup__text_state_invalid',
}

// попапы профиля и добавления фото и формы в них
export const popupInfo = document.querySelector('.popup_type_info');
export const popupPhotos = document.querySelector('.popup_type_photos');
export const popupAvatar = document.querySelector('.popup_type_edit-avatar');
export const formInfo = popupInfo.querySelector('.popup__form_type_info');
export const formPhotos = popupPhotos.querySelector('.popup__form_type_photos');
export const formAvatar = popupAvatar.querySelector('.popup__form_type_edit-avatar');

export const profileAvatar = document.querySelector('.profile__avatar');

// фото галерея
export const gridContainer = document.querySelector('.photo-grid');

// шаблон карточки
export const cardTemplate = document.querySelector('#card-template');

//кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

// переменные формы добавления карточки
export const inputPicName = popupPhotos.querySelector('.popup__text_type_pic-name');
export const inputLink = popupPhotos.querySelector('.popup__text_type_link');
