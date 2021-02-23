import React, { useContext } from "react";
import { Link, Route, Switch } from 'react-router-dom'
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";



export default function Header({ isOpen, onSignOut, onChangeHeaderMenu, onClickMenu, isLoggedIn }) {

    const currentUser = useContext(CurrentUserContext);



    return (
        <Switch>
            <Route exact path="/">
                <header className="header">
                    <div className="header__background" />
                    <div className="header__container">
                        <h3 className="header__logo">NewsExplorer</h3>
                        <div className="header__button-wrapper" onClick={onChangeHeaderMenu}>
                            <button className={`header__button-mobile ${onClickMenu ? `header__button-mobile_active` : ""}`} /></div>
                        <div className="header__menu-desktop">
                            <Link to="/" className="header__link header__link-border">Главная
                            <div className="header__border" />
                            </Link>
                            {isLoggedIn ? <Link to="/saved-news" className="header__link">Сохранённые статьи</Link> : ""}
                            {isLoggedIn ? <div onClick={onSignOut} className="header__button header__button-login">
                                <Link to="/" className="header__login">{currentUser.name}</Link>
                                <div className="header__button-image" />
                            </div> : <button className="header__button" onClick={isOpen}>Авторизоваться</button>}
                        </div>
                    </div>
                    <div className={`header__menu ${onClickMenu ? `header__menu_open` : ""}`}>
                        <Link to="/" className="header__link">Главная</Link>
                        {isLoggedIn ? <Link to="/saved-news" className="header__link">Сохранённые статьи</Link> : ""}
                        {isLoggedIn ? <div onClick={onSignOut} className="header__button header__button-login">
                            <Link to="/" className="header__login">{currentUser.name}</Link>
                            <div className="header__button-image" />
                        </div> : <button className="header__button" onClick={isOpen}>Авторизоваться</button>}
                    </div>
                </header>
            </Route>
            <Route path="/saved-news">
                <header className="header">
                    <div className="header__container header__container-login">
                        <h3 className="header__logo header__logo-login">NewsExplorer</h3>
                        <div className="header__button-wrapper" onClick={onChangeHeaderMenu}>
                            <button className={`header__button-mobile-login ${onClickMenu ? `header__button-mobile_active` : ""}`} /></div>
                        <div className="header__menu-desktop">
                            <Link to="/" className="header__link header__link-login">Главная</Link>
                            <Link to="/saved-news" className="header__link header__link-login header__link-border">Сохранённые статьи
                            <div className="header__border header__border-login" />
                            </Link>
                            <div onClick={onSignOut} className="header__button header__button-login">
                                <Link to="/" className="header__login">{currentUser.name}</Link>
                                <div className="header__button-image" />
                            </div>
                        </div>
                    </div>

                    <div className={`header__menu ${onClickMenu ? `header__menu_open` : ""}`}>
                        <Link to="/" className="header__link header__link-login">Главная</Link>
                        <Link to="/saved-news" className="header__link header__link-login">Сохранённые статьи</Link>
                        <div onClick={onSignOut} className="header__button header__button-login">
                            <Link to="/" className="header__login">{currentUser.name}</Link>
                            <div className="header__button-image" />
                        </div>
                    </div>
                </header>
            </Route>
        </Switch>
    )
}
