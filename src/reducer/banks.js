import {
    UPDATE,
    REQUEST,
    START,
    FAILED,
    RECEIVE,
    BANKS,
    FILTER
} from '../constants';
import {createSelector} from 'reselect'

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
        case RECEIVE + BANKS:
            return {
                ...state,
                isInvalid: false,
                current: payload,
                data: payload,
                isLoading: false
            }
        case UPDATE + FILTER :
            return {
                ...state,
                current : payload,
            }
        case REQUEST + FAILED:
            return {
                ...state,
                isInvalid: true,
                error: payload
            }
        default:
            return state;
    }
};

export const stateSelectorBanks = (state) => state['banks'];
export const currentSelectorBanks = createSelector(stateSelectorBanks, (banks) => banks['current']);



