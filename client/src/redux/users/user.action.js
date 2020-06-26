import{
  LOGIN_USER_STARTS, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED,
  SIGN_UP_USER_STARTS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED
} from './types'



export const loginStart = (all=true, objData) => {
  return {
    type: all ? LOGIN_USER_STARTS : SIGN_UP_USER_STARTS,
    payload: objData
  }
}
export const fetchSuccess = (all=true ,data) => {
  return {
    type: all ? LOGIN_USER_SUCCESS : SIGN_UP_USER_SUCCESS,
    payload: data
  }
}
export const fetchFailed = (all=true, err) => {
  return {
    type: all ? LOGIN_USER_FAILED : SIGN_UP_USER_FAILED,
    payload: err
  }
}
