import React, { useState, useCallback, useEffect } from "react";
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

import { newsApi } from "../../utils/NewsApi"
import { mainApi } from "../../utils/MainApi"
import * as NewsExplorerAuth from "../../utils/NewsExplorerAuth";
import { getToken, setToken, removeToken } from "../../utils/token";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  const history = useHistory();

  // state popup hooks
  const [isSigninPopupOpened, setSigninPopupOpened] = useState(false);
  const [isSignupPopupOpened, setSignupPopupOpened] = useState(false);
  const [isInfoPopupOpened, setInfoPopupOpened] = useState(false);
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);

  const [isCurrentUser, setCurrentUser] = useState({});
  const [isSavedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isWaitResponse, setWaitResponse] = useState(false);
  const [isApiErrorText, setApiErrorText] = useState("");
  const [isKeyword, setKeyword] = useState("");
  const [isSearching, setSearching] = useState(false);
  const [isNoResults, setResults] = useState(false);
  const [isServerError, setServerError] = useState(false);
  const [isFoundArticles, setFoundArticles] = useState([]);



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

  useEffect(() => {

    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <div className="App">
        <Header onSignOut={signOut} isOpen={handleSigninPopup} onClickMenu={isHeaderMenuOpen} onChangeHeaderMenu={handleHeaderMenu} isLoggedIn={isLoggedIn} />
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
        <Login
          onClose={closeAllPopups}
          onCloseOverlay={closeAllPopups}
          popupTitle="Вход"
          isOpen={isSigninPopupOpened}
          linkText="Зарегистрироваться"
          switchPopup={changeToSignupPopup}
          onSubmit={submitSigninPopup}
          auth={handleUserLogin}
          apiErrorText={isApiErrorText}
        />
        <InfoPopup
          onClose={closeAllPopups}
          onCloseOverlay={closeAllPopups}
          popupTitle="Пользователь успешно зарегистрирован!"
          isOpen={isInfoPopupOpened}
          linkText="Войти"
          switchPopup={changeToSigninPopup}
        />
        <Register
          onClose={closeAllPopups}
          onCloseOverlay={closeAllPopups}
          popupTitle="Регистрация"
          isOpen={isSignupPopupOpened}
          buttonText="Зарегистрироваться"
          linkText="Войти"
          switchPopup={changeToSigninPopup}
          onSubmit={submitSignupPopup}
          auth={handleUserRegister}
          apiErrorText={isApiErrorText}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
