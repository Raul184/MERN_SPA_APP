import { takeLatest , call , put , all } from 'redux-saga/effects'
import { 
  LOGIN_USER_STARTS , 
  SIGN_UP_USER_STARTS,
  LOGOUT_USER_START,
  UPLOAD_USER_PROFILE_STARTS
} from './types'
import { 
  fetchSuccess, 
  fetchFailed,
  logoutSuccess,
  logoutFailed,
  updateSuccess,
  updateFailed
} from './user.action'
const axios = require('axios');

// LOGIN USER
export function* loginAsync({payload}) {
  try {
    const data = yield axios.post('/api/v1/users/login', payload) 
    yield put(
      fetchSuccess(all, data.data)
    );
  } 
  catch (error) {
    yield put(
      fetchFailed(all , error.message)
    )
  }
}
export function* fetchUserStart() {
  yield takeLatest( LOGIN_USER_STARTS ,loginAsync )
}

// LOGIN OUT USER
export function* logOutAsync(){
  try {
    const res = yield axios.get('/api/v1/users/logout')
    yield put(
      logoutSuccess(res)
    )   
  } 
  catch (err) {
    yield put( 
      logoutFailed(err.response.data.message)
    );  
  }
}
export function* logoutUserStart(){
  yield takeLatest( LOGOUT_USER_START, logOutAsync)
}

// SIGN UP USER
export function* signUpAsync({payload}) {
  try {
    const data = yield axios.post(`/api/v1/users/signup`, payload) 
    yield put(
      fetchSuccess(false, data.data)
    );
  } 
  catch (error) {
    yield put(
      fetchFailed(false , error.message)
    )
  }
}
export function* fetchSignUserStart() {
  yield takeLatest( SIGN_UP_USER_STARTS ,signUpAsync )
}

// UPDATE PROFILE 
export function* updateAsync({payload}) {
  try {
    const data = yield axios.patch(`/api/v1/users/updateMe`, payload) 
    yield put(
      updateSuccess(data)
    );
  } 
  catch (error) {
    yield put(
      updateFailed(error.message)
    )
  }
}
export function* updateUserStart() {
  yield takeLatest(UPLOAD_USER_PROFILE_STARTS ,updateAsync)
}

export function* userSagas(){
  yield all([ 
    call(fetchUserStart),
    call(fetchSignUserStart),
    call(logoutUserStart),
    call(updateUserStart)
  ])
}