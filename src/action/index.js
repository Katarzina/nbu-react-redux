import {
    REQUEST, START, FAILED, RECEIVE, RATE,
    UPDATE, DAY, MONTH, YEAR, AMOUNT, CURRENCY, FILTER
} from '../constants'

const A = (type) => (payload) => ({ type, payload });

export const requestStart = (mode) => ({
        type: REQUEST + START + mode,
})

export const  requestFailed = (payload, mode) => ({
    type: REQUEST + FAILED + mode,
    payload
})

export const receiveQuery = (payload, type) => ({
    type,
    payload
})

// rate
export const updateRate = A(UPDATE + RATE);
export const updateDay = A(UPDATE + DAY);
export const updateMonth = A(UPDATE + MONTH);
export const updateYear = A(UPDATE + YEAR);
// converter
export const updateAmount = A(UPDATE + AMOUNT);
export const updateCurrency = A(UPDATE + CURRENCY);
// payment balance
export const updateFilter = A(UPDATE + FILTER);

export const fetchApi = (link, mode) => {

    return (dispatch) => {

        dispatch(requestStart(mode));
        return fetch(link)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(json => (
                dispatch(receiveQuery(json, RECEIVE + mode))
                )
            ).catch(error => {
                dispatch(requestFailed(error.toString(),mode))
            })
    }

}

