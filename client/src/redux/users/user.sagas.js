import { takeLatest , call , put , all } from 'redux-saga/effects'
import { LOGIN_USER_STARTS , SIGN_UP_USER_STARTS} from './types'
import { 
  fetchSuccess , 
  fetchFailed 
} from './user.action'
const axios = require('axios');

// LOGIN USER
export function* loginAsync(user) {
  try {
    let data = yield axios.post('/api/v1/users/login', user) 
    yield put(
      fetchSuccess(all, data)
    );
  } 
  catch (error) {
    yield put(
      fetchFailed(all , error.message)
    )
  }
}
// Listener
export function* fetchUserStart() {
  yield takeLatest( LOGIN_USER_STARTS ,loginAsync )
}


// SIGN UP USER
export function* signUpAsync(user) {
  try {
    const data = yield axios.post(`/api/v1/user/signup`, user) 
    yield put(
      fetchSuccess(false, data)
    );
  } 
  catch (error) {
    yield put(
      fetchFailed(false , error.message)
    )
  }
}
// Listener
export function* fetchSignUserStart() {
  yield takeLatest( SIGN_UP_USER_STARTS ,signUpAsync )
}


export function* userSagas(){
  yield all([ 
    call(fetchUserStart),
    call(fetchSignUserStart)
  ])
}