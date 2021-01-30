import React from "react";
import "./About.css";
import avatar from "../../images/me.jpg"
export default function About() {
    return (
        <section className="about">
            <img className="about__avatar" src={avatar} alt="Фотография автора" />
            <div className="about__container">
                <h2 className="about__title">Об авторе</h2>
                <p className="about__description">Меня зовут Паша и я начинающий Frontend-разработчик.
                У меня далеко не все гладко получается в освоении данного направления,
                но я усердно стараюсь и иду до конца, как говорится - this is the way.
                На данный момент я заканчиваю курсы Я.Практикума по направлению Веб-разработчик
                и мой стэк: native JS, React, CSS+HTML - естественно адаптивная верстка enabled.
                Базово дружу с Git-ом и webpack-ом, научился работать с API. Также научился общаться с
                      backend-ом и базово знаю: NodeJS(Express) и MongoDB.</p>
                <p className="about__description">Хочу найти себя в этом безграничном мире IT. А если
                серьезно, то я пришел сюда из мира строительства, где все очень (очень) аналоговое и архаичное, хочется сделать строительство
                 - цифровым и удобным в работе для проектировщиков и строителей. Такова моя цель.</p>
            </div>
        </section>
    )
}