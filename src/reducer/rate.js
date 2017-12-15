import {
    REQUEST,
    START,
    FAILED,
    RECEIVE,
    RATE,
    BUDGET,
    UPDATE,
    DAY,
    MONTH,
    YEAR
} from '../constants';
import {
    dateYear, dateMonth, dateDay
} from '../share/share';

import {createSelector} from 'reselect'

const initialState = {
    isInvalid: false,
    isLoading: false,
    day: dateDay,
    month: dateMonth,
    year: dateYear
};

export default (state = initialState, action) => {
    const {type, payload : current, error, day, month, year} = action;
   // console.log(type, current, day);
    switch (type) {
        case REQUEST + START:
            return {
                ...state,
                isInvalid: false,
                isLoading: true
            }
        case RECEIVE + RATE:
            return {
                ...state,
                isInvalid: false,
                current,
                isLoading: false
            }

        case RECEIVE + BUDGET:
            return {
                ...state,
                isInvalid: false,
                current,
                isLoading: false
            }

        case REQUEST + FAILED:
            return {
                ...state,
                isInvalid: true,
                isLoading: false,
                error
            }
        case UPDATE + DAY :
            return {
                ...state,
                day: day
            }
        case UPDATE + MONTH :
            return {
                ...state,
                month: month
            }
        case UPDATE + YEAR :
            return {
                ...state,
                year: year
            }
        case UPDATE + RATE :
            return {
                ...state,
                current
            }
        default:
            return state;
    }
};

export const stateSelector = (state) => state['rate'];
export const currentSelector = createSelector(stateSelector, (rate) => rate['current']);

