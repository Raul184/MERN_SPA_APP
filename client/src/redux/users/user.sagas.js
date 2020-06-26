import { takeLatest , call , put , all } from 'redux-saga/effects'
import { 
  LOGIN_USER_STARTS , 
  SIGN_UP_USER_STARTS,
  FETCH_USER_PROFILE_STARTS
} from './types'
import { 
  fetchSuccess, 
  fetchFailed,
  fetchUserProfileSuccess,
  fetchUserProfileFailed
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
// SIGN UP USER
export function* signUpAsync({payload}) {
  console.log(payload);
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
// Get User profile data
export function* getProfileData(){
  try {
    const data = yield axios.get('127.0.0.1:4000/api/v1/users/me') 
    yield put(
      fetchUserProfileSuccess(data)
    ); 
  } 
  catch (error) {
    yield put(
      fetchUserProfileFailed(error.message)
    )
  }
}
export function* fetchProfileUserStart() {
  yield takeLatest(FETCH_USER_PROFILE_STARTS, getProfileData)
}

export function* userSagas(){
  yield all([ 
    call(fetchUserStart),
    call(fetchSignUserStart),
    call(fetchProfileUserStart)
  ])
}