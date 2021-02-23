import React, { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import About from "../About/About"
import NewsCardList from "../NewsCardList/NewsCardList"
import { Route, useHistory } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import InfoPopup from "../InfoPopup/InfoPopup";
import Preloader from "../Preloader/Preloader";
import NoNewsFound from "../NoNewsFound/NoNewsFound";
import CurrentUserContext from "../../contexts/CurrentUserContext"

import { mainApi } from "../../utils/MainApi"
import * as NewsExplorerAuth from "../../utils/NewsExplorerAuth";
import { getToken, setToken, removeToken } from "../../utils/token";

function App() {
  const history = useHistory();
  const nameInput = useRef();
  // state popup hooks
  const [isSigninPopupOpened, setSigninPopupOpened] = useState(false)
  const [isSignupPopupOpened, setSignupPopupOpened] = useState(false)
  const [isInfoPopupOpened, setInfoPopupOpened] = useState(false)
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isWaitResponse, setWaitResponse] = useState(false)
  const [isApiErrorText, setApiErrorText] = useState('')


  function generateIdCard() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
  }


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


  // close all popups
  function closeAllPopups() {
    setSigninPopupOpened(false)
    setSignupPopupOpened(false)
    setInfoPopupOpened(false)
    setApiErrorText('')
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

  function changeToInfoPopup() {
    closeAllPopups()
    handleInfoPopup()
  }
  //login submit

  function submitSigninPopup() {
    setLoggedIn(true)
    closeAllPopups()
  }

  //reg submit

  function submitSignupPopup() {
    handleInfoPopup()
  }

  function handleUserRegister(name, email, password) {
    setWaitResponse(true)
    NewsExplorerAuth.register(name, email, password)
      .then((res) => {
        setWaitResponse(false)
        if (res.status === 200) {
          changeToInfoPopup()
        } else {
          res.json()
            .then((res) =>
              setApiErrorText(res.message))
        }
      })
      .catch((err) => {
        setWaitResponse(false)
        console.log(err)
      })
  }

  function handleUserLogin(email, password) {
    setWaitResponse(true)
    NewsExplorerAuth.authorize(email, password)
      .then((data) => {
        setWaitResponse(false)
        if (!data) {
          setApiErrorText('Что-то пошло не так! Попробуйте ещё раз. :(')
        } else {
          setToken(data.token)
          tokenCheck()
          submitSigninPopup()
        }
      })
      .then(() => {
        mainApi.getCardList()
          .then(
            (res) => {
              const data = res;
              setSavedArticles(data)
            })
          .catch(err => console.log(err))
      }).catch((err) => {
        setWaitResponse(false)
        setApiErrorText(err.message)
      })
  }

  function tokenCheck() {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    NewsExplorerAuth.getContent(jwt).then((res) => {
      if (res) {
        const currentUser = res;
        setLoggedIn(true)
        setCurrentUser(currentUser)
        history.push('/')
      } else {
        return
      }
    })
      .catch(err => console.log(err))
  }


  function signOut() {
    removeToken()
    localStorage.clear()
    setLoggedIn(false)
    history.push('/')
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
