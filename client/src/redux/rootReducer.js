import { combineReducers } from 'redux';
import toursReducer from './tours/tours.reducer'

const rootReducer = combineReducers({
  toursDb: toursReducer
});

export default rootReducer;
