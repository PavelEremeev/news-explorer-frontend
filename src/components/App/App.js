import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import About from "../About/About.js"
import NewsCardList from "../NewsCardList/NewsCardList.js"
import { Route, useHistory } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InfoPopup from '../InfoPopup/InfoPopup';
import Preloader from '../Preloader/Preloader';
import NoNewsFound from '../NoNewsFound/NoNewsFound'

function App() {
  const history = useHistory();
  const nameInput = useRef();
  // state hooks
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSigninPopupOpened, setSigninPopupOpened] = useState(false)
  const [isSignupPopupOpened, setSignupPopupOpened] = useState(false)
  const [isInfoPopupOpened, setInfoPopupOpened] = useState(false)
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)


  const handleHeaderMenu =
    useCallback(() =>
      setHeaderMenuOpen(prev => !prev),
      [setHeaderMenuOpen]);


  function handleSigninPopup() {
    setSigninPopupOpened(true)
  }

  function handleSignupPopup() {
    setSignupPopupOpened(true)
  }

  function handleInfoPopup() {
    setInfoPopupOpened(true)
  }



  function signOut() {
    setLoggedIn(false)
    history.push('/')
  }

  function toggleLoggedIn() {
    setLoggedIn(true)
  }
  // close all popups
  function closeAllPopups() {
    setSigninPopupOpened(false)
    setSignupPopupOpened(false)
    setInfoPopupOpened(false)
  }
  // switch from one popup to another
  function changeToSignupPopup() {
    closeAllPopups()
    handleSignupPopup()
  }

  function changeToSigninPopup() {
    closeAllPopups()
    handleSigninPopup()
  }
  //Логин сабмит

  function submitSigninPopup() {
    toggleLoggedIn()
  }

  //Регистрация сабмит

  function submitSignupPopup() {
    handleInfoPopup()
  }


  const handleСloseOnEsc =
    useCallback((evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleСloseOnEsc, false);
    return () => {
      document.removeEventListener('keyup', handleСloseOnEsc, false);
    };
  }, [handleСloseOnEsc])


  return (
    <div className="App">
      <Header onSignOut={signOut} isOpen={handleSigninPopup} onClickMenu={isHeaderMenuOpen} onChangeHeaderMenu={handleHeaderMenu} />
      <Route exact path="/">
        <SearchForm />
        <Preloader testing={false} />
        <NoNewsFound testing={false} />
        <NewsCardList
          status="searchNews"
          isLoggedIn={isLoggedIn} />
        <About />
      </Route>
      <Route path="/saved-news">
        <SavedNewsHeader />
        <NewsCardList
          status="savedNews"
          isLoggedIn={isLoggedIn} />
      </Route>
      <Footer />
      <PopupWithForm
        onClose={closeAllPopups}
        onCloseOverlay={closeAllPopups}
        popupTitle="Вход"
        isOpen={isSigninPopupOpened}
        buttonText="Войти"
        linkText="Зарегистрироваться"
        switchPopup={changeToSignupPopup}
        onSubmit={submitSigninPopup}
      />
      <InfoPopup
        onClose={closeAllPopups}
        onCloseOverlay={closeAllPopups}
        popupTitle="Пользователь успешно зарегистрирован!"
        isOpen={isInfoPopupOpened}
        linkText="Войти"
        switchPopup={changeToSigninPopup}
      />
      <PopupWithForm
        onClose={closeAllPopups}
        onCloseOverlay={closeAllPopups}
        popupTitle="Регистрация"
        isOpen={isSignupPopupOpened}
        buttonText="Зарегистрироваться"
        linkText="Войти"
        switchPopup={changeToSigninPopup}
        onSubmit={submitSignupPopup}
      >
        <p className="popup__subtitle">Имя</p>
        <input ref={nameInput}
          type="name"
          name="name"
          placeholder="Введите своё имя"
          className="popup__input" />
      </PopupWithForm>
    </div>
  );
}

export default App;
