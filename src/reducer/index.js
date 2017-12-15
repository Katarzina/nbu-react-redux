import { combineReducers } from 'redux'
import rate from './rate'
import { loading } from './loading';

const rootReducer = combineReducers({
	loading,
	//budget,
	rate
});

export default rootReducer;
