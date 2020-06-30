import { takeLatest , call , put , all } from 'redux-saga/effects'
import { 
  LOGIN_USER_STARTS , 
  SIGN_UP_USER_STARTS,
  LOGOUT_USER_START,
  UPLOAD_USER_PROFILE_STARTS,
  UPDATE_USER_PASSWORD_STARTS
} from './types'
import { 
  fetchSuccess, 
  fetchFailed,
  logoutSuccess,
  logoutFailed,
  updateSuccess,
  updateFailed,
  updatePasswordSuccess
} from './user.action'
const axios = require('axios');

// LOGIN USER
export function* loginAsync({payload}) {
  try {
    const res = yield axios.post('/api/v1/users/login', payload) 
    yield put(
      fetchSuccess(all, res.data.data.user)
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
    console.log(data.data.data.user);
    yield put(
      fetchSuccess(false, data.data.data.user)
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
      updateFailed(false, error.message)
    )
  }
}
export function* updateUserStart() {
  yield takeLatest(UPLOAD_USER_PROFILE_STARTS ,updateAsync)
}

// UPDATE PASSWORD
export function* updatePasswordAsync({payload}) {
  const{passwordCurrent,password,passwordConfirm} = payload;
  try {
    const data = yield axios.patch(
      `/api/v1/users/updateMyPassword`, 
      {passwordCurrent,password,passwordConfirm}
    ) 
    yield put(
      updatePasswordSuccess(data)
    );
  } 
  catch (error) {
    yield put(
      updateFailed(true, error.message)
    )
  }
}
export function* updatePasswordStart() {
  yield takeLatest(UPDATE_USER_PASSWORD_STARTS ,updatePasswordAsync)
}

export function* userSagas(){
  yield all([ 
    call(fetchUserStart),
    call(fetchSignUserStart),
    call(logoutUserStart),
    call(updateUserStart),
    call(updatePasswordStart)
  ])
}