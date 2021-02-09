import React from "react"
import { Link } from "react-router-dom";
import "../PopupWithForm/PopupWithForm.css";

export default function InfoPopup({ isOpen, onClose, switchPopup, onCloseOverlay, popupTitle, linkText }) {

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={onCloseOverlay}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClose={onClose} />
                <h2 className="popup__title">{popupTitle}</h2>
                <Link className="popup__link" onClick={switchPopup}>{linkText}</Link>
            </div>
        </section>
    )
}