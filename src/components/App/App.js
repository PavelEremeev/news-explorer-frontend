import React, { useState, useRef } from 'react';
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

function App() {
  const history = useHistory();
  const nameInput = useRef();
  // state hooks
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSigninPopupOpened, setSigninPopupOpened] = useState(false)
  const [isSignupPopupOpened, setSignupPopupOpened] = useState(false)
  const [isInfoPopupOpened, setInfoPopupOpened] = useState(false)

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

  function submitSigninPopup() {
    toggleLoggedIn()
  }

  return (
    <div className="App">
      <Header onSignOut={signOut} isOpen={handleSigninPopup} />
      <Route exact path="/">
        <SearchForm />
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
        popupTitle="Вход"
        isOpen={isSigninPopupOpened}
        buttonText="Войти"
        linkText="Зарегистрироваться"
        switchPopup={changeToSignupPopup}
        onSubmit={submitSigninPopup}
      />
      <InfoPopup
        onClose={closeAllPopups}
        popupTitle="Пользователь успешно зарегистрирован"
        isOpen={isInfoPopupOpened}
        linkText="Войти"
        switchPopup={changeToSigninPopup}
      />
    </div>
  );
}

export default App;
