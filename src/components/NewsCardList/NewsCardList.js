import React, { useState } from "react";
import NewCard from "../NewsCard/NewCard.js"
import "./NewsCardList.css"

export default function NewsCardList({
    isLoggedIn,
    status,
    onSearch,
    initialArticles,
    savedArticles,
    isKeyword,
    isOpen,
    onCardSave,
    onCardRemove,
    onSavedCardRemove,

}) {


    const [isRow, setRow] = useState(3)

    function nextRow() {
        setRow(isRow + 3)
    }

    const cardsAmount = initialArticles.length
    let elementsToRender = initialArticles.slice(0, isRow)

    return (
        <section className={onSearch ? "new-cardlist" : "new-cardlist new-cardlist_closed"}>
            {status === "searchNews" ? <h2 className="new-cardlist__results-title">Результаты поиска</h2> : <></>}
            <div className="new-cardlist__grid-container">
                {status === "searchNews" ?
                    (elementsToRender.map((card, i) =>
                        <NewCard
                            status={status}
                            isLoggedIn={isLoggedIn}
                            keyword={isKeyword}
                            title={card.title}
                            text={card.description}
                            date={card.publishedAt}
                            source={card.source.name}
                            link={card.url}
                            image={card.urlToImage}
                            data={card}
                            isSaved={card.isSaved}
                            onCardSave={onCardSave}
                            onCardRemove={onCardRemove}
                            onSavedCardRemove={onSavedCardRemove}
                            isOpen={isOpen}
                            key={i}
                        />)) : ""
                    // (savedArticles.map(card, i =>
                    //     <NewCard
                    //         status={status}
                    //         isLoggedIn={isLoggedIn}
                    //         isKeyword={card.keyword}
                    //         data={card}
                    //         title={card.title}
                    //         text={card.text}
                    //         date={card.date}
                    //         source={card.source}
                    //         link={card.link}
                    //         image={card.image}
                    //         key={i}
                    //         onCardRemove={onCardRemove}
                    //         onSavedCardRemove={onSavedCardRemove}
                    //         isLoggedIn={isLoggedIn}
                    //     />))}
                }
            </div>
            {status === "searchNews" && isRow <= cardsAmount ? <button onClick={nextRow} className="new-cardlist__button">Показать ещё</button> : <> </>}
        </section>
    )
}