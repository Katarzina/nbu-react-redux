// COMMON
export const REQUEST = 'REQUEST'
export const RECEIVE = 'RECEIVE'
export const START = '_START'
//export const SUCCESS = '_SUCCESS'
export const FAILED = '_FAILED'
export const RATE = '_RATE'
export const BANKS = '_BANKS'
export const FILTER = '_FILTER'

export const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/'
export const RATE_LINK = 'exchange?json'
export const RATE_LINK_DATE = "exchange?date="
export const BANKS_LINK = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/balanceofpayments?date=201601&json'
export const USD_CURRENCY = 'USD'
export const EUR_CURRENCY = 'EUR'
export const RUB_CURRENCY = 'RUB'
export const UAH_CURRENCY = 'UAH'
export const PLN_CURRENCY = 'PLN'
export const NULL_CURRENCY_VALUE = 0.00
//export const PATTERN = '[.0-9]*'
export const ARRAY_MAIN_CURRENCY = [USD_CURRENCY,EUR_CURRENCY,RUB_CURRENCY,PLN_CURRENCY]
export const ARRAY_CURRENCY = [USD_CURRENCY,EUR_CURRENCY,RUB_CURRENCY,UAH_CURRENCY]
export const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь',
    'Декабрь'];

export const UPDATE = 'UPDATE';
export const DAY = '_DAY';
export const MONTH = '_MONTH';
export const YEAR = '_YEAR';
export const AMOUNT = '_AMOUNT'
export const CURRENCY = '_CURRENCY'
