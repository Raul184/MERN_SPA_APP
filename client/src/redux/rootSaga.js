import { all , call } from 'redux-saga/effects'
//sagas
import {toursSagas} from './tours/tours.sagas'
import {userSagas} from './users/user.sagas'
export default function* rootSaga(){
  yield all([ 
    call( toursSagas ) ,
    call( userSagas )
  ])
}