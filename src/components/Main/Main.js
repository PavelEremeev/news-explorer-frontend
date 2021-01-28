import React from "react";
import "./Main.css";

export default function Main() {
    return (
        <main className="main">
            <section className="search">
                <h1 className="search__ttile">
                    Что творится в мире?
                </h1>
                <h3 className="search__subtitle">
                    Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
                </h3>
                <form className="search__form">
                    <input className="search__input" placeholder="Введите тему новости"></input>
                    <button className="search__button">Искать</button>
                </form>
            </section>
        </main>
    )
}