import React from 'react';
import './NoNewsFound.css';
import notFound from '../../images/not-found.svg'


export default function NoNewsFound({ onSearch }) {
    return (
        <section className={onSearch ? `not-found not-found_opened` : `not-found`}>
            <img className="not-found__image" src={notFound} alt="notfound.img"></img>
            <p className="not-found__title">Ничего не найдено</p>
            <p className="not-found__subtitle">К сожалению, по вашему запросу ничего не найдено.</p>
        </section>
    );
}
