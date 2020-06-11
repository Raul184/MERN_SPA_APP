import { takeLatest , call , put , all } from 'redux-saga/effects'
import { FETCH_TOURS_STARTS } from './types'
import { 
  fetchToursSuccess , 
  fetchToursFailed 
} from './tours.action'
const axios = require('axios');

export function* fetchDataAsync() {
  try {
    const data = yield axios.get('/api/v1/tours') 
    yield put(
      fetchToursSuccess(data)
    );
  } 
  catch (error) {
    yield put(
      fetchToursFailed(error.message)
    )
  }
}

// Listener
export function* fetchStart() {
  yield takeLatest( FETCH_TOURS_STARTS ,fetchDataAsync )
}

export function* toursSagas(){
  yield all([ 
    call( fetchStart ) 
  ])
}