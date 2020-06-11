import { combineReducers } from 'redux';
import toursReducer from './tours/tours.reducer'

const rootReducer = combineReducers({
  tours: toursReducer
});

export default rootReducer;
