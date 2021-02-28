require('dotenv').config();

const { NODE_ENV } = process.env;

const BASE_URL = NODE_ENV === 'production' ?
  'https://api.eremeev1.students.nomoredomains.rocks' :
  'http://localhost:3000';

const BASE_URL_API = NODE_ENV === 'production' ?

  'https://nomoreparties.co/news/v2/top-headlines' :
  'https://newsapi.org/v2/everything';


const API_KEY = 'fd1e859e79f74af4b07453725f46383e';

const CARDS_IN_A_ROW = 3;

const DATE_TO = 7;

export {
  BASE_URL,
  BASE_URL_API,
  API_KEY,
  CARDS_IN_A_ROW,
  DATE_TO,
};
