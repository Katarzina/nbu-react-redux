import {
    REQUEST,
    START,
    FAILED,
    RECEIVE,
    RATE,
    BUDGET
} from '../constants';

const initialState = {
    isInvalid: false,
    isLoading: false
};

export default (state = initialState, action) => {

    const {type, payload} = action

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
                current: payload,
                isLoading: false
            }

        case RECEIVE + BUDGET:
            return {
                ...state,
                isInvalid: false,
                current: payload,
                isLoading: false
            }
        case REQUEST + FAILED:
            return {
                ...state,
                isInvalid: true,
                error: action.error
            }

        default:
            return state;
    }
};


