import React, { useState } from "react";
import NewCard from "../NewsCard/NewCard.js"
import "./NewsCardList.css"

// Для изначальных карточек
import image1 from "../../images/image_04.png"
import image2 from "../../images/image_07.png"
import image3 from "../../images/image_08.png"

const initialCards = [
    {
        keyword: "Природа",
        title: "Национальное достояние – парки",
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'Лента.ру',
        link: 'https://www.lenta.ru',
        image: image1,
    },
    {
        keyword: "Природа",
        title: "Лесные огоньки: история одной фотографии",
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'Медуза',
        link: 'https://www.lenta.ru',
        image: image2,
    },
    {
        keyword: "Природа",
        title: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
        text: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        date: '2 августа, 2019',
        source: 'РИА',
        link: 'https://www.lenta.ru',
        image: image3,
    },
    {
        keyword: "Природа",
        title: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
        text: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        date: '2 августа, 2019',
        source: 'РИА',
        link: 'https://www.lenta.ru',
        image: image3,
    },
    {
        keyword: "Природа",
        title: "Лесные огоньки: история одной фотографии",
        text: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        date: '2 августа, 2019',
        source: 'Медуза',
        link: 'https://www.lenta.ru',
        image: image2,
    },
    {
        keyword: "Природа",
        title: "Национальное достояние – парки",
        text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        date: '2 августа, 2019',
        source: 'Лента.ру',
        link: 'https://www.lenta.ru',
        image: image1,
    },
]

export default function NewsCardList({ isLoggedIn, status }) {


    const [row, setRow] = useState(3)

    function nextRow() {
        setRow(row + 3)
    }


    let elementsToRender = initialCards.slice(0, row)

    return (
        <section className="new-cardlist">
            {status === "searchNews" ? <h2 className="new-cardlist__results-title">Результаты поиска</h2> : <></>}
            <div className="new-cardlist__container">
                {status === "searchNews" ? (elementsToRender.map(card =>
                    <NewCard
                        status={status}
                        isLoggedIn={isLoggedIn}
                        keyword={card.keyword}
                        title={card.title}
                        text={card.text}
                        date={card.date}
                        source={card.source}
                        link={card.link}
                        image={card.image}
                        isOwn={true}
                    />)) :
                    (initialCards.map(card =>
                        <NewCard
                            status={status}
                            isLoggedIn={isLoggedIn}
                            keyword={card.keyword}
                            title={card.title}
                            text={card.text}
                            date={card.date}
                            source={card.source}
                            link={card.link}
                            image={card.image}
                            isOwn={true}
                        />))}
            </div>
            {status === "searchNews" ? <button onClick={nextRow} className="new-cardlist__button">Показать ещё</button> : <> </>}
        </section>
    )
}