import { takeLatest , call , put , all } from 'redux-saga/effects'
import { LOGIN_USER_STARTS , SIGN_UP_USER_STARTS} from './types'
import { 
  fetchSuccess , 
  fetchFailed 
} from './user.action'
const axios = require('axios');

// LOGIN USER
export function* loginAsync() {
  try {
    let data = yield axios.get('/api/v1/tours') 
    data = convertCollectionsSnapshotToMap(data.data.data)
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
export function* fetch1DataAsync(action) {
  try {
    console.log(action);
    const data = yield axios.get(`/api/v1/tours/${action.payload}`) 
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
export function* fetch1Start() {
  yield takeLatest( SIGN_UP_USER_STARTS ,fetch1DataAsync )
}


export function* toursSagas(){
  yield all([ 
    call(fetchUserStart),
    call(signUserStart)
  ])
}