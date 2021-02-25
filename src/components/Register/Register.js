import React from "react"
import { useInput } from "../../utils/Validator"
import "../PopupWithForm/PopupWithForm.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function Register({ isOpen, onClose, onCloseOverlay, apiErrorText, popupTitle, linkText, switchPopup, auth }) {

    const userName = useInput('', { isEmpty: true, minLength: 2, maxLength: 40 })
    const password = useInput('', { isEmpty: true, minLength: 6 })
    const email = useInput('', { isEmpty: true, isEmail: true, maxLength: 40 })

    const handleSubmit = (evt) => {
        auth(userName.value, email.value, password.value)
    }

    return (
        <PopupWithForm
            popupTitle={popupTitle}
            linkText={linkText}
            isOpen={isOpen}
            onClose={onClose}
            onCloseOverlay={onCloseOverlay}
            switchPopup={switchPopup}
            onSubmit={handleSubmit}>
            <p className="popup__subtitle">E-mail</p>
            <input
                onChange={email.onChange}
                onBlur={email.onBlur}
                type="email"
                name="email"
                placeholder="Введите почту"
                className="popup__input" />
            {(email.isDirty && email.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(email.isDirty && email.isEmailError) && <span className='popup__input-error'>Некорректный e-mail</span>}
            {(email.isDirty && email.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}
            <p className="popup__subtitle">Пароль</p>
            <input
                onChange={password.onChange}
                onBlur={password.onBlur}
                type="password"
                name="password"
                placeholder="Введите пароль"
                className="popup__input" />
            {(password.isDirty && password.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(password.isDirty && password.minLengthError) && <span className='popup__input-error'>Минимальная длина: 6 символов</span>}
            <p className="popup__subtitle">Имя</p>
            <input
                onChange={userName.onChange}
                onBlur={userName.onBlur}
                type="text"
                name="name"
                placeholder="Введите своё имя"
                className="popup__input" />
            {(userName.isDirty && userName.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(userName.isDirty && userName.minLengthError) && <span className='popup__input-error'>Минимальная длина: 2 символа</span>}
            {(userName.isDirty && userName.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}
            <span className="popup__error-text">{apiErrorText}</span>
            <button
                disabled={!email.inputValid || !password.inputValid || !userName.inputValid}
                type="submit"
                id="submit"
                className={(email.inputValid && password.inputValid && userName.inputValid)
                    ? `popup__submit-button`
                    : `popup__submit-button popup__submit-button_disabled`}>
                Войти</button>
        </PopupWithForm>
    )
}