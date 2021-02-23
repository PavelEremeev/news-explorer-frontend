import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {

    const [isSearchWord, setSearchWord] = useState("")


    function handleSearch(evt) {
        setSearchWord(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSearch({ isSearchWord })
    }

    return (
        <section className="search">
            <h1 className="search__title">
                Что творится в мире?
                </h1>
            <h3 className="search__subtitle">
                Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
                </h3>
            <form className="search__form" onSubmit={handleSubmit}>
                <input className="search__input"
                    placeholder="Введите тему новости"
                    onChange={handleSearch}
                    value={isSearchWord}
                    required
                ></input>
                <button className="search__button">Искать</button>
            </form>
        </section>
    )
}