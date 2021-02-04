import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import About from "../About/About.js"
import NewsCardList from "../NewsCardList/NewsCardList.js"
import { Route } from 'react-router-dom';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  function toggleLoggedIn() {
    setLoggedIn(true)
  }

  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Main />
        <NewsCardList
          status="searchNews"
          isLoggedIn={isLoggedIn} />
        <About />
      </Route>


    </div>
  );
}

export default App;
