import { takeLatest , call , put , all } from 'redux-saga/effects'
import { FETCH_TOURS_STARTS , FETCH_TOUR_STARTS} from './types'
import { 
  fetchSuccess , 
  fetchFailed 
} from './tours.action'
const axios = require('axios');

// GET ALL TOURS
export function* fetchDataAsync() {
  try {
    const data = yield axios.get('/api/v1/tours') 
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
export function* fetchStart() {
  yield takeLatest( FETCH_TOURS_STARTS ,fetchDataAsync )
}


// GET 1 TOUR
export function* fetch1DataAsync(id) {
  try {
    const data = yield axios.get(`/api/v1/tours/${id}`) 
    yield put(
      fetchSuccess(all=false, data)
    );
  } 
  catch (error) {
    yield put(
      fetchFailed(all=false , error.message)
    )
  }
}
// Listener
export function* fetch1Start() {
  yield takeLatest( FETCH_TOUR_STARTS ,fetch1DataAsync )
}


export function* toursSagas(){
  yield all([ 
    call(fetchStart),
    call(fetch1Start)
  ])
}