import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import toursReducer from './tours/tours.reducer'
import userReducer from './users/user.reducer'

const persistConfig={
  key:'root',
  storage,
  whitelist:['user']
}

const rootReducer = combineReducers({
  toursDb: toursReducer,
  user: userReducer
});

export default persistReducer(persistConfig,rootReducer);
