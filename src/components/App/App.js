import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import About from "../About/About"
import NewsCardList from "../NewsCardList/NewsCardList"
import { Route, useHistory } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Footer from "../Footer/Footer";
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
  const [isNoResults, setNoResults] = useState(false);
  const [isHaveResults, setHaveResults] = useState(false);
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

  // registration and authorization

  function handleUserRegister(name, email, password) {
    setWaitResponse(true)
    NewsExplorerAuth.register(name, email, password)
      .then((res) => {
        setWaitResponse(false)
        if (res.status === 200) {
          changeToInfoPopup()
        } else {
          console.log(res)
          res.json().then((res) => setApiErrorText(res.message))
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
        const isCurrentUser = res;
        setLoggedIn(true)
        setCurrentUser(isCurrentUser)
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
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }, []);

  // searching news

  function handleSearchWord(a) {
    const wordInput = a.isSearchWord;
    setKeyword(wordInput)
    localStorage.removeItem("keyword");
    localStorage.setItem("keyword", JSON.stringify(wordInput))
    setHaveResults(false)
    setNoResults(false)
    setSearching(true)
    setServerError(false)
    newsApi.getNewsCardList(wordInput)
      .then((res) => {
        if (res.totalResults !== 0) {
          console.log(res)
          setSearching(false)
          setHaveResults(true)

          const foundData = res.articles;
          foundData.forEach((data) => {
            data.isSaved = false
            data.isId = generateIdCard();
          })
          localStorage.removeItem("foundData")
          localStorage.setItem("foundData", JSON.stringify(foundData))

          const foundDataLocal = JSON.parse(localStorage.getItem("foundData"))
          setFoundArticles(foundDataLocal)
        } else {
          setSearching(false)
          setNoResults(true)
        }
      })
      .catch((err) => {
        setSearching(false)
        setServerError(true)
        console.log(err)
      });
  }

  // saving news

  function handleSaveClick(card) {
    mainApi.createCard({
      keyword: isKeyword,
      title: card.title,
      text: card.description,
      date: card.publishedAt,
      source: card.source.name,
      link: card.url,
      image: card.urlToImage,
    }).then((newCard) => {
      card._id = newCard._id;
      card.isSaved = true;

      const newFoundArticles = isFoundArticles.map((c) => c.isId === card.isId ? card : c)
      localStorage.remove("foundData")
      localStorage.setItem("foundData", JSON.stringify(newFoundArticles))

      const foundDataLocal = JSON.parse(localStorage.getItem("foundData"))
      setFoundArticles(foundDataLocal)
      setSavedArticles([...isSavedArticles, newCard])
    }).catch((err) => { console.log(err) })
  }

  // deleting news

  function handleRemoveClick(card) {
    mainApi.deleteCard(card._id)
      .then((newCard) => {
        card.isSaved = false;
        const newCards = isSavedArticles.filter((c) => c._id !== card._id);
        setSavedArticles(newCards);

        const newFoundArticles = isFoundArticles.map((c) => c.isId === card.isId ? card : c)
        localStorage.removeItem("foundData")
        localStorage.setItem("foundData", JSON.stringify(newFoundArticles))

        const foundDataLocal = JSON.parse(localStorage.getItem("foundData"))
        setFoundArticles(foundDataLocal)
      }).catch((err) => console.loge(err))
  }

  function keywordsArray() {
    const key = isSavedArticles.map((card) => card.keyword)
    return key.sort().filter(function (card, pos, ary) {
      return !pos || card !== ary[pos - 1];
    });
  }


  useEffect(() => {
    document.addEventListener('keyup', handleСloseOnEsc, false);
    return () => {
      document.removeEventListener('keyup', handleСloseOnEsc, false);
    };
  }, [handleСloseOnEsc])

  useEffect(() => {
    tokenCheck();
  }, []);


  useEffect(() => {
    const foundDataLocal = JSON.parse(localStorage.getItem("foundData"))
    const word = JSON.parse(localStorage.getItem("isKeyword"))
    if (foundDataLocal !== null) {
      setFoundArticles(foundDataLocal)
      setKeyword(word)
      setHaveResults(true)
    }
    mainApi.getInitialInfo().then(
      (res) => {
        const items = res[1]
        setSavedArticles(items)
      }).catch((err) => {
        console.log(err);
        setLoggedIn(false)
      });
  }, [])

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <div className="App">
        <Header
          onSignOut={signOut}
          isOpen={handleSigninPopup}
          onClickMenu={isHeaderMenuOpen}
          onChangeHeaderMenu={handleHeaderMenu}
          isLoggedIn={isLoggedIn} />
        <Route exact path="/">
          <SearchForm onSearch={handleSearchWord} />
          <Preloader
            onSearch={isSearching}
            onRequest={isWaitResponse} />
          <NoNewsFound onSearch={isNoResults} />
          <NewsCardList
            status="searchNews"
            onSearch={isHaveResults}
            initialArticles={isFoundArticles}
            onCardSave={handleSaveClick}
            onCardRemove={handleRemoveClick}
            isOpen={handleSignupPopup}
            isKeyword={isKeyword}
            isLoggedIn={isLoggedIn}
          />
          <About />
        </Route>
        <Route path="/saved-news">
          <SavedNewsHeader />
          <NewsCardList
            status="savedNews"
            isLoggedIn={isLoggedIn}
            savedArticles={isSavedArticles}
            initialArticles={isFoundArticles} />
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
