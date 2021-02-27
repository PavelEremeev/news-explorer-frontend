import React from 'react';
import './About.css';
import avatar from '../../images/avatarka.jpg';

function About() {
    return (
        <section className="about">
            <img className="about__avatar" src={avatar} alt="Фотография автора"></img>
            <div className="about__text-container">
                <h2 className="about__title">Об авторе</h2>
                <p className="about__text">Меня зовут Паша и&nbsp;я&nbsp;начинающий Frontend-разработчик.
                У&nbsp;меня далеко не&nbsp;все гладко получается в&nbsp;освоении данного направления,
                но&nbsp;я&nbsp;усердно стараюсь и&nbsp;иду до&nbsp;конца, как говорится&nbsp;&mdash; this is&nbsp;the way.
                На&nbsp;данный момент я&nbsp;заканчиваю курсы Я.Практикума по&nbsp;направлению Веб-разработчик
                и&nbsp;мой стэк: native JS, React, CSS+HTML&nbsp;&mdash; естественно адаптивная верстка enabled.
                Дружу с&nbsp;Git-ом и&nbsp;webpack-ом, научился работать с&nbsp;API. Также научился общаться с
backend-ом и&nbsp;базово знаю: NodeJS(Express) и&nbsp;MongoDB.</p>
                <p className="about__text">Хочу найти себя в&nbsp;этом безграничном мире IT. А&nbsp;если
                серьезно, то&nbsp;я&nbsp;пришел сюда из&nbsp;мира строительства, где все очень <b>(очень)</b> аналоговое и&nbsp;архаичное, хочется сделать строительство
&mdash;&nbsp;цифровым и&nbsp;удобным в&nbsp;работе для проектировщиков и&nbsp; сдаче объектов для строителей.</p>
            </div>
        </section>
    );
}

export default About;