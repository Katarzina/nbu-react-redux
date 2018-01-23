import { combineReducers } from 'redux'
import rate from './rate'
import banks from './banks'

const rootReducer = combineReducers({
	banks,
	rate
});

export default rootReducer;
