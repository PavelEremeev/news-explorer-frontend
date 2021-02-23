import React from "react"
import { Link } from "react-router-dom";
import "./PopupWithForm.css";


export default function PopupWithForm({ isOpen, onSubmit, onClose, children, onCloseOverlay, linkText, popupTitle, switchPopup }) {


    function closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onCloseOverlay()
        }
    }


    // временное решение сабмита
    function handleSubmit(evt) {
        evt.preventDefault()
        onSubmit()
    }

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={closePopupOnOverlay}>
            <form className="popup__container" onSubmit={handleSubmit} action="#" noValidate>
                <button onClick={onClose}
                    className="popup__close-button"
                    type="button" />
                <h2 className="popup__title">{popupTitle}</h2>
                {children}
                <div className="popup__login">
                    <p className="popup__login-text">или</p>
                    <Link className="popup__link" onClick={switchPopup}>{linkText}</Link>
                </div>
            </form>
        </section>
    )
}