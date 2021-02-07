import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import About from "../About/About.js"
import NewsCardList from "../NewsCardList/NewsCardList.js"
import { Route } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(true);

  function toggleLoggedIn() {
    setLoggedIn(true)
  }

  return (
    <div className="App">
      <Header />
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

    </div>
  );
}

export default App;
