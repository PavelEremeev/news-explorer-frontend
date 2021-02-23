import React from 'react';
import './Preloader.css';


export default function Preloader({ onSearch, onRequest }) {
    return (
        <section>
            <div className={onSearch ? "preloader preloader_opened" : "preloader"}>
                <i className="preloader__circle"></i>
                <p className="preloader__text">Идет поиск новостей...</p>
            </div>
            <div className={onRequest ? "preloader preloader_opened" : "preloader"}>
                <i className="preloader__circle"></i>
            </div>
        </section>
    );
}
