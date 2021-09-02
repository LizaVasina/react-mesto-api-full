import React, {useState, useEffect } from 'react';
import { Redirect, Switch, Route, Link, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import './App.css';



function App() {
  const [loggedIn, setLoggenIn] = useState(false);
  const history = useHistory();
  const initialData = {
    email: '',
    password: ''
  }
  const [data, setData] = React.useState(initialData);

  //контекст пользователя
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });

  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [infoPopupStatus, setInfoPopupStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

    // useEffect(() => {
    //   const initialCards = api.getInitialCards();
    //   initialCards.then((cardsInfo) => {
    //     setCards(cardsInfo);
    //   })
    //   .catch((err) => console.log(err));
    // }, []);

    // useEffect(() => {
    //   api.getProfileData()
    //     .then((userDara) => {
    //       setCurrentUser(userDara);
    //       console.log(currentUser);
    //     })
    //     .catch((err) => console.log(err))
    // }, []);


    function handleCardLike(card) {
      console.log('prev', card._id);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    console.log(isLiked);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        console.log('new', newCard);
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
    }

    function handleCardDelete(deletedCard) {
      api.deleteCard(deletedCard._id)
        .then(() => {
          const newCards = cards.filter(currentCard => currentCard != deletedCard);
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }

  

  function handleCardClick(cardData) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userInfo) {
    api.updateProfileData(userInfo.name, userInfo.about)
      .then((userInfo) => {
        console.log(userInfo.data, 'вывожууужужужу');
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarInfo) {
    api.updateProfileAvatar(avatarInfo.avatar)
      .then((avatarInfo) => {
        setCurrentUser(avatarInfo.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addCard(cardInfo.name, cardInfo.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  // ИСПРАВИТЬ ЛОГИН
  function handleLogin (data) {
    // auth.login(data)
    //   .then(res => {
    //     // localStorage.setItem('jwt', res.token);
    //     localStorage.setItem('loggedIn', true);
    //     console.log('залогинились', localStorage.loggedIn);
    //     setData({
    //       email: data.email,
    //       password: data.password
    //     });
    //     setLoggenIn(true);
    //     setInfoPopupStatus(true);
    //     setIsInfoToolTipPopupOpen(true);
    //     setTimeout(() => {
    //       setIsInfoToolTipPopupOpen(false);
    //       history.push('/');
    //     }, 2000);
    //   })
    //   .catch(err => {
    //     setIsInfoToolTipPopupOpen(true);
    //     setInfoPopupStatus(false);
    //     console.log(err)
    //   });

    auth.login(data)
      .then(() => {
        setInfoPopupStatus(true);
        setIsInfoToolTipPopupOpen(true);
        setData({
          email: data.email,
          password: data.password
        });
        setLoggenIn(true);
        
        return api.getProfileData()
          .then(res => {
            setCurrentUser(res.currentUser);

            return api.getInitialCards()
              .then(res => {
                if (Array.isArray(res)) {
                  setCards(res);
                }
              })
              .then(() => {
                localStorage.setItem('loggedIn', true);
                setLoggenIn(true);
                setTimeout(() => {
                  setIsInfoToolTipPopupOpen(false);
                  history.push('/');
                }, 2000);
              })
          })
      })
      .catch(err => {
        setIsInfoToolTipPopupOpen(true);
        setInfoPopupStatus(false);
        console.log(err)
      });
  }

  function handleRegister (data) {
    auth.register(data)
      .then(() => {
        setIsInfoToolTipPopupOpen(true);
        setInfoPopupStatus(true);
        setTimeout(() => {
          setIsInfoToolTipPopupOpen(false);
          history.push('/sign-in');
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setIsInfoToolTipPopupOpen(true);
        setInfoPopupStatus(false);
      });
  }

  const handleSignOut = () => {
    // localStorage.removeItem('jwt');
    localStorage.setItem('loggedIn', false);
    setLoggenIn(false);
    history.push('/sing-in');
  }

  useEffect(() => {
    // const jwt = localStorage.getItem('jwt');
    // if (jwt) {
    //   auth.getContent(jwt)
    //     .then(res => {
    //       setLoggenIn(true);
    //       setData({
    //         email: res.data.email,
    //         password: res.data.password
    //       })
    //       history.push('/');
    //     })
    //     .catch(() => history.push('/sign-in'));
    // }
    if (localStorage.loggedIn === true) {
      auth.checkCredentials()
        .then(res => {
          setData({
            email: res.data.email,
            password: res.data.password
          })

          return api.getProfileData()
            .then(res => {
              setCurrentUser(res);

              return api.getInitialCards()
                .then(res => {
                  if (Array.isArray(res)) {
                    setCards(res);
                  }
                })
                .then(() => {
                  setLoggenIn(true);
                  history.push('./');
                })
            })
        })
        .catch(err => {
          localStorage.setItem('loggedIn', false);
          console.log(err);
        });
    }
  }, [history]);

  return (
<div className="App">
  <div className="page">
    <div className="page_content">

    
      <Switch>
        <Route path="/sign-up">
          <Header>
            <Link to="/sign-in" className="header__button header__button_place_sign-up">Войти</Link>
          </Header>
          <Register
            onRegister={handleRegister}
          ></Register>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            popupStatus={infoPopupStatus}
            onClose={closeAllPopups}
            action={"зарегистрировались"}
            ></InfoTooltip>
        </Route>
        <Route path="/sign-in">
          <Header>
            <Link to="/sign-up" className="header__button header__button_place_sign-up">Регистрация</Link>
          </Header>
          <Login
            onLogin={handleLogin}
          ></Login>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            popupStatus={infoPopupStatus}
            onClose={closeAllPopups}
            action={"авторизировались"}
            ></InfoTooltip>
        </Route>

        <CurrentUserContext.Provider value={currentUser}>
        
        <ProtectedRoute path="/"
                component={Main}
                loggedIn={loggedIn}
                userData={data}

                onEditProfilePopup={handleEditProfilePopupOpen}
                onAddPlacePopup={handleAddPlacePopupOpen}
                onEditAvatarPopup={handleEditAvatarPopupOpen}
                cards={cards}
                selectedCard={selectedCard}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}

                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isSubmitPopupOpen={isSubmitPopupOpen}
                isImagePopupOpen={isImagePopupOpen}

                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleUpdateAvatar}
                onAddPlace={handleAddPlaceSubmit}
                onSignOut={handleSignOut}
                >
        
        </ProtectedRoute>
        </CurrentUserContext.Provider>
        
        <Route>
          {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
        </Route>
      </Switch>

      
    
    </div>
        </div>
        </div>
  );
}

export default App;

