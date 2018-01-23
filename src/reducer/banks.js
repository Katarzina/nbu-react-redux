import {
    UPDATE, REQUEST,
    RECEIVE, FAILED,
    BANKS, START,
    FILTER
} from '../constants';
import {createSelector} from 'reselect'

const initialState = {
    isInvalid: false,
    isLoading: false,
    isLoaded: false
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case REQUEST + START + BANKS:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVE + BANKS:
            return {
                ...state,
                balance: payload,
                data: payload,
                isInvalid: false,
                isLoaded: true,
                isLoading: false
            }
        case UPDATE + FILTER :
            return {
                ...state,
                balance: payload,
            }
        case REQUEST + FAILED + BANKS:
            return {
                ...state,
                error: payload,
                isInvalid: true,
                isLoading: false
            }
        default:
            return state;
    }
};

export const stateSelectorBanks = (state) => state['banks'];
export const currentSelectorBanks = createSelector(stateSelectorBanks, (banks) => banks['balance']);



