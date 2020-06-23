import { takeLatest , call , put , all } from 'redux-saga/effects'
import { FETCH_TOURS_STARTS , FETCH_TOUR_STARTS} from './types'
import { 
  fetchSuccess , 
  fetchFailed 
} from './tours.action'
import {convertCollectionsSnapshotToMap} from '../../utils/utils'
const axios = require('axios');

// GET ALL TOURS
export function* fetchDataAsync() {
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
export function* fetchStart() {
  yield takeLatest( FETCH_TOURS_STARTS ,fetchDataAsync )
}


// GET 1 TOUR
export function* fetch1DataAsync(action) {
  try {
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
  yield takeLatest( FETCH_TOUR_STARTS ,fetch1DataAsync )
}


export function* toursSagas(){
  yield all([ 
    call(fetchStart),
    call(fetch1Start)
  ])
}