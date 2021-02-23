import moment from 'moment'
const newsApiKey = 'fd1e859e79f74af4b07453725f46383e';
const today = moment().format()
const weekAgo = moment().subtract(7, 'days').format()
console.log(today)
console.log(weekAgo)


class NewsApi {
    constructor({ baseUrl, pageSize, from, to }) {
        this._baseUrl = baseUrl;
        this._pageSize = pageSize;
        this._from = from;
        this._to = to;
    }

    getNewsCardList(searchWord) {
        return fetch(`${this._baseUrl}/v2/everything?q=${searchWord}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}`, {
            headers: {
                authorization: newsApiKey,
            },
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }
}

export const newsApi = new NewsApi({
    baseUrl: 'https://newsapi.org',
    pageSize: 100,
    from: weekAgo,
    to: today,
});