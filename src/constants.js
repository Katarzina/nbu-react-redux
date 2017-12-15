// COMMON

export const REQUEST = 'REQUEST'
export const RECEIVE = 'RECEIVE'
export const START = '_START'
export const SUCCESS = '_SUCCESS'
export const FAILED = 'FAILED'
export const RATE = '_RATE'
export const BUDGET = '_BUDGET'
//export const FORECAST = '_FORECAST'

export const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory'
export const RATE_LINK = 'exchange?json'
//export const RATE_LINK_DATE = "exchange?date=20171210&json"
export const RATE_LINK_DATE = "exchange?date="
export const BUDGET_LINK = 'budget?period=y&date=201601&json'
export const ARRAY_CURRENCY = ['USD','EUR','RUB','PLN']
export const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь',
    'Декабрь'];

export const UPDATE = 'UPDATE';
export const DAY = '_DAY';
export const MONTH = '_MONTH';
export const YEAR = '_YEAR';