import {
    REQUEST, START, FAILED, RECEIVE, RATE,
    UPDATE, DAY, MONTH, YEAR, AMOUNT, CURRENCY, FILTER
} from '../constants'
import {LOADING, LOADING_RATE, LOADED} from "../reducer/loading";

export const loading = (payload) => ({type: LOADING, payload})
export const loaded = (payload) => ({type: LOADED, payload})

export function requestStart() {
    return {
        type: REQUEST + START,
    }
}

export const  requestFailed = (error) =>  ({
        type: REQUEST + FAILED,
        payload : error
    })

export const receiveQuery = (payload, type) =>  ({
        type,
        payload
    })

export const updateRate = (payload) => ({
    type: UPDATE + RATE,
    payload
})

export const updateFilter = (payload) => ({
    type: UPDATE + FILTER,
    payload
})

export const updateAmount = (amount) => ({
    type: UPDATE + AMOUNT,
    payload: amount
})

export const updateCurrency = (currency) => ({
    type: UPDATE + CURRENCY,
    payload: currency
})

export const updateDay = (day) => ({
    type: UPDATE + DAY,
    payload: day
})

export const updateMonth = (month) => ({
    type: UPDATE + MONTH,
    payload: month
})

export const updateYear = (year) => ({
    type: UPDATE + YEAR,
    payload: year
})

export function fetchApi(link , mode) {

    return function (dispatch) {

        dispatch(loading(LOADING_RATE));
        dispatch(requestStart());
      //  console.log(link)
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
            ).then(dispatch(loaded(LOADING_RATE)))
                .catch(error => {
                    dispatch(requestFailed(error.toString()))
                })
    }

}

