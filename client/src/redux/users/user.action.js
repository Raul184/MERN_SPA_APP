import{
  LOGIN_USER_STARTS, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED,
  SIGN_UP_USER_STARTS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED,
  FETCH_USER_PROFILE_STARTS,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILED,
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

export const fetchUserProfileStarts = () => {
  return {
    type: FETCH_USER_PROFILE_STARTS
  }
}
export const fetchUserProfileSuccess = data => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: data
  }
}
export const fetchUserProfileFailed = data => {
  return {
    type: FETCH_USER_PROFILE_FAILED,
    payload: data
  }
}