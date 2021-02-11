import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import "./Header.css";



export default function Header({ userName, isOpen, onSignOut, onChangeHeaderMenu, onClickMenu }) {



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
                            <Link to="/" className="header__link">Главная</Link>
                            <Link to="/saved-news" className="header__link">Сохранённые статьи</Link>
                            <button className="header__button" onClick={isOpen}>Авторизоваться</button>
                        </div>
                    </div>
                    <div className="header__border" />
                    <div className={`header__menu ${onClickMenu ? `header__menu_open` : ""}`}>
                        <Link to="/" className="header__link">Главная</Link>
                        <Link to="/saved-news" className="header__link">Сохранённые статьи</Link>
                        <button className="header__button" onClick={isOpen}>Авторизоваться</button>
                    </div>
                </header>
            </Route>
            <Route exact path="/saved-news">
                <header className="header">
                    <div className="header__container header__container-login">
                        <h3 className="header__logo header__logo-login">NewsExplorer</h3>
                        <div className="header__button-wrapper" onClick={onChangeHeaderMenu}>
                            <button className={`header__button-mobile-login ${onClickMenu ? `header__button-mobile_active` : ""}`} /></div>
                        <div className="header__menu-desktop">
                            <Link to="/" className="header__link header__link-login">Главная</Link>
                            <Link to="/saved-news" className="header__link header__link-login">Сохранённые статьи</Link>
                            <div className="header__button-container">
                                <Link to="/" onClick={onSignOut} className="header__button header__button-login">Павел</Link>
                                <div className="header__button-image" />
                            </div>
                        </div>
                    </div>
                    <div className="header__border-login" />
                    <div className={`header__menu ${onClickMenu ? `header__menu_open` : ""}`}>
                        <Link to="/" className="header__link header__link-login">Главная</Link>
                        <Link to="/saved-news" className="header__link header__link-login">Сохранённые статьи</Link>
                        <div className="header__button-container">
                            <Link to="/" onClick={onSignOut} className="header__button header__button-login">Павел</Link>
                            <div className="header__button-image" />
                        </div>
                    </div>
                </header>
            </Route>
        </Switch>
    )
}
