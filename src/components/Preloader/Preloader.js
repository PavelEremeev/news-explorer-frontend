import React from 'react';
import './Preloader.css';


export default function Preloader({ testing }) {
    return (
        <section className={testing ? "preloader preloader_opened" : "preloader"}>
            <i class="preloader__circle"></i>
            <p className="preloader__text">Идет поиск новостей...</p>
        </section>
    );
}
