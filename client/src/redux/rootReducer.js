import { combineReducers } from 'redux';
import toursReducer from './tours/tours.reducer'
import userReducer from './users/user.reducer'

const rootReducer = combineReducers({
  toursDb: toursReducer,
  user: userReducer
});

export default rootReducer;
