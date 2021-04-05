import moment from 'moment'
import { SEARCHDAYS } from './constants'
const today = moment().format()
const weekAgo = moment().subtract(SEARCHDAYS, 'days').format()
console.log(today)
console.log(weekAgo)


class NewsApi {
    constructor({ address, pageSize, from, to }) {
        this._address = address;
        this._pageSize = pageSize;
        this._from = from;
        this._to = to;
        this._apiKey = apiKey;
    }

    getNewsCardList(searchWord) {
        return fetch(`${this._address}/v2/everything?q=${searchWord}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`)
            .then((res) =>
                res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
            );
    }
}

export const newsApi = new NewsApi({
    address: 'https://nomoreparties.co/news',
    pageSize: 100,
    from: weekAgo,
    to: today,
    apiKey: 'fd1e859e79f74af4b07453725f46383e',
});