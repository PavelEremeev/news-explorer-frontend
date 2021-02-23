import { getToken } from './token';

class MainApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    getInitialInfo() {
        return Promise.all([
            this.getUserInfo(),
            this.getCardList()]);
    }

    getUserInfo() {
        const token = getToken();
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }

    getCardList() {
        const token = getToken();
        return fetch(`${this._baseUrl}/articles`, {
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }

    createCard({ keyword, title, text, date, source, link, image }) {
        const token = getToken();
        return fetch(`${this._baseUrl}/articles`, {
            method: "POST",
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword, title, text, date, source, link, image
            }),
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }

    deleteCard(articleId) {
        const token = getToken();
        return fetch(`${this._baseUrl}/articles/${articleId}`, {
            method: "DELETE",
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }
}

export const mainApi = new MainApi({

    baseUrl: "http://localhost:3000",

});