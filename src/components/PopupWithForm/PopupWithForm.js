import React from "react"
import { Link } from "react-router-dom";
import "./PopupWithForm.css";
import { useRef } from "react";


export default function PopupWithForm({ isOpen, onSubmit, onClose, children, onCloseOverlay, linkText, buttonText, popupTitle, switchPopup }) {
    const emailInput = useRef()
    const passInput = useRef()

    // временное решение сабмита
    function handleSubmit(evt) {
        evt.preventDefault()
        onSubmit()
        emailInput.current.value = null;
        passInput.current.value = null;
        onClose()
    }

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={onCloseOverlay}>
            <form className="popup__container" onSubmit={handleSubmit} action="#" noValidate>
                <button onClick={onClose}
                    className="popup__close-button"
                    type="button" />
                <h2 className="popup__title">{popupTitle}</h2>
                <p className="popup__subtitle">E-mail</p>
                <input ref={emailInput}
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    className="popup__input" />
                <p className="popup__subtitle">Пароль</p>
                <input ref={passInput}
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    className="popup__input" />
                {children}
                {/* <p className="popup__error-text" /> */}
                <button type="submit" id="submit" className="popup__submit-button">{buttonText}</button>
                <div className="popup__login">
                    <p className="popup__login-text">или</p>
                    <Link className="popup__link" onClick={switchPopup}>{linkText}</Link>
                </div>
            </form>
        </section>
    )
}