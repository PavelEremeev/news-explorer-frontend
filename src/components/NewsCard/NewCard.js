import React, { useState } from "react";
import "./NewCard.css";
export default function NewCard({
    title,
    text,
    date,
    source,
    link,
    image,
    isOwn,
    isSaved,
    keyword,
    isLoggedIn,
    onCardSave,
    onCardRemove,
    status
}) {

    const [isRemove, setRemove] = useState(false)
    const [isMarked, setMarked] = useState(false)
    const [isAdded, setAdded] = useState(false)


    function handleAddToFavsClick() {
        setAdded(true)
    }

    function handleRemoveClick() {
        setRemove(true)
    }

    function handleMarkClick() {
        setMarked(true)
    }
    return (
        <section className="new-card">
            <a href={link} target="_blank" rel="noreferrer" className="new-card__link">
                <img className="new-card__image" src={image} alt={title} />
            </a>
            <p className={status === "savedNews" ? "new-card__keyword" : "new-card__keyword_hidden"}>{keyword}</p>
            <button className={isRemove ? "new-card__remove-window"
                : "new-card__remove-window_hidden"}>
                Убрать из сохранённых</button>
            <button onClick={handleRemoveClick}
                className={status === "savedNews" ? "new-card__remove-icon"
                    : "new-card__remove-icon_hidden"} />
            <button className={isMarked ? "new-card__remind-window"
                : "new-card__remind-window_hidden"}>
                Войдите, чтобы сохранить статью</button>
            {status === "searchNews" ?
                <button onClick={isLoggedIn ? handleAddToFavsClick : handleMarkClick}
                    className={isAdded ? "new-card__mark_active" : "new-card__mark"} /> :
                <button onClick={handleRemoveClick} className="new-card__remove-icon" />}
            <div className="new-card__text">
                <h6 className="new-card__date">{date}</h6>
                <a href={link} className="new-card__link" rel="noreferrer" target="_blank">
                    <h4 className="new-card__title">{title}</h4>
                </a>
                <a href={link} className="new-card__link" rel="noreferrer" target="_blank">
                    <h4 className="new-card__information">{text}</h4>
                </a>
                <h5 className="new-card__source">{source}</h5>
            </div>
        </section>
    )

}