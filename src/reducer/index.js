import { combineReducers } from 'redux'
import rate from './rate'
import banks from './banks'
import { loading } from './loading';

const rootReducer = combineReducers({
	loading,
	banks,
	rate
});

export default rootReducer;
