import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.js"
import About from "../About/About.js"
export default function Main() {
    return (
        <main className="main">
            <SearchForm />
            <About />
        </main>
    )
}