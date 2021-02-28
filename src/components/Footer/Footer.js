import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg"
import telegramIcon from "../../images/telegram.svg"

export default function Footer() {

    function getFullYear() {
        const newYear = new Date().getFullYear();
        return newYear;
    }

    return (
        <footer className="footer">
            <h3 className="footer__author">&copy; {getFullYear()} Supersite, Powered by News API</h3>
            <div className="footer__container">
                <div className="footer__link-container">
                    <Link to="/" className="footer__link">Главная</Link>
                    <a href="https://praktikum.yandex.ru" className="footer__link" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
                </div>
                <div className="footer__social-container">
                    <a href="https://github.com/PavelEremeev" className="footer__social-link" rel="noreferrer" target="_blank"><img alt="github.pic" className="footer__social-icon" src={githubIcon} /></a>
                    <a href="https://t.me/kermit_kvebit" className="footer__social-link" rel="noreferrer" target="_blank"><img alt="telegram.pic" className="footer__social-icon" src={telegramIcon} /></a>
                </div>
            </div>
        </footer>
    )
}