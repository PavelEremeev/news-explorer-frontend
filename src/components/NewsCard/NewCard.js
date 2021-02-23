import React, { useState } from "react";
import moment from 'moment';
import 'moment/locale/ru'
import "./NewCard.css";
export default function NewCard({
    title,
    text,
    date,
    source,
    link,
    image,
    keyword,
    isLoggedIn,
    onCardSave,
    onCardRemove,
    onSavedCardRemove,
    isOpen,
    isSaved,
    data,
    status
}) {

    const [isRemove, setRemove] = useState(false)
    const [isMarked, setMarked] = useState(false)


    function handleStateClick() {
        if (isSaved) {
            onCardRemove(data)
        } else {
            onCardSave(data)
        }
    }

    function handleRemoveClick() {
        setRemove(!isRemove)
    }

    function handleRemoveFavorite() {
        onSavedCardRemove(data)
    }

    function handleMarkClick() {
        setMarked(!isMarked)
    }

    function formatDate(a) {
        moment.locale('ru');
        return moment(a).format('LL');
    }

    return (
        <section className="new-card">
            <a href={link} target="_blank" rel="noreferrer" className="new-card__link">
                <img className="new-card__image" src={image} alt={title} />
            </a>
            <p className={status === "savedNews" ? "new-card__keyword" : "new-card__keyword_hidden"}>{keyword}</p>
            <button onClick={handleRemoveFavorite} className={isRemove ? "new-card__remove-window"
                : "new-card__remove-window_hidden"}>
                Убрать из сохранённых</button>
            <button onClick={handleRemoveClick}
                className={status === "savedNews" ? "new-card__remove-icon"
                    : "new-card__remove-icon_hidden"} />
            <button className={isMarked ? "new-card__remind-window"
                : "new-card__remind-window_hidden"}>
                Войдите, чтобы сохранить статью</button>
            {status === "searchNews"
                ?
                <button
                    onMouseOver={isLoggedIn ? "" : handleMarkClick}
                    onMouseOut={isLoggedIn ? "" : handleMarkClick}
                    onClick={isLoggedIn ? handleStateClick : isOpen}
                    className={isSaved ? "new-card__mark_active" : "new-card__mark"} />
                :
                <button onClick={handleRemoveClick}
                    className="new-card__remove-icon" />}
            <div className="new-card__text">
                <h6 className="new-card__date">{formatDate(date)}</h6>
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