import React from "react";
import "./SavedNewsHeader.css";

export default function SavedNewsHeader() {
    return (
        <section className="saved-news">
            <div className="saved-news__container">
                <h3 className="saved-news__title">Сохранённые статьи</h3>
                <h2 className="saved-news__info">Павел, у вас 6<br></br> сохраненных статей</h2>
                <h3 className="saved-news__subtitle">По ключевым словам: <span className="saved-news__keyword">Природа</span></h3>
            </div>
        </section>
    )
}