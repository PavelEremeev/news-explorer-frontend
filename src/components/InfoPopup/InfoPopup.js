import React from "react"
import { Link } from "react-router-dom";
import "../PopupWithForm/PopupWithForm.css";

export default function InfoPopup({ isOpen, onClose, switchPopup, onCloseOverlay, popupTitle, linkText }) {

    function closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onCloseOverlay()
        }
    }
    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={closePopupOnOverlay}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClose={onClose} />
                <h2 className="popup__title">{popupTitle}</h2>
                <Link to='/' className="popup__link" onClick={switchPopup}>{linkText}</Link>
            </div>
        </section>
    )
}