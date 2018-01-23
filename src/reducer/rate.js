import {
    REQUEST, START,
    FAILED, RECEIVE,
    RATE, UPDATE,
    DAY, MONTH,
    YEAR, AMOUNT,
    CURRENCY,
    NULL_CURRENCY_VALUE, USD_CURRENCY
} from '../constants';
import {
    dateYear, dateMonth, dateDay
} from '../share/share';

import {createSelector} from 'reselect'

const initialState = {
    isInvalid: false,
    isLoading: false,
    isLoaded: false,
    day: dateDay,
    month: dateMonth,
    year: dateYear,
    amount: NULL_CURRENCY_VALUE,
    currency: USD_CURRENCY
};

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case REQUEST + START + RATE:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVE + RATE:
            return {
                ...state,
                currencyRate: payload,
                isInvalid: false,
                isLoaded: true,
                isLoading: false
            }
        case REQUEST + FAILED + RATE:
            return {
                ...state,
                error: payload,
                isInvalid: true,
                isLoading: false
            }
        case UPDATE + CURRENCY:
            return {
                ...state,
                currency: payload,
            }
        case UPDATE + AMOUNT:
            return {
                ...state,
                amount: payload,
            }
        case UPDATE + DAY :
            return {
                ...state,
                day: payload,
            }
        case UPDATE + MONTH :
            return {
                ...state,
                month: payload,
            }
        case UPDATE + YEAR :
            return {
                ...state,
                year: payload,
            }
        case UPDATE + RATE :
            return {
                ...state,
                currencyRate: payload,
            }
        default:
            return state;
    }
};

export const stateSelector = (state) => state['rate'];
export const rateSelector = createSelector(stateSelector, (rate) => rate['currencyRate']);

