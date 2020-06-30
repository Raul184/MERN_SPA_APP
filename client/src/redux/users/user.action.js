import{
  LOGIN_USER_STARTS, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  SIGN_UP_USER_STARTS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED,
  LOGOUT_USER_START,
  UPLOAD_USER_PROFILE_STARTS,
  UPLOAD_USER_PROFILE_SUCCESS,
  UPLOAD_USER_PROFILE_FAILED,
  UPDATE_USER_PASSWORD_STARTS,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILED
} from './types'


// LOGIN/SIGN UP
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
// LOGOUT 
export const logoutStart = () => {
  return {
    type: LOGOUT_USER_START
  }
}
export const logoutSuccess = payload => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload
  }
}
export const logoutFailed = payload => {
  return {
    type: LOGOUT_USER_FAILED,
    payload
  }
}
export const updateStart = (password=false, payload) => {
  return {
    type: password ? UPDATE_USER_PASSWORD_STARTS:UPLOAD_USER_PROFILE_STARTS,
    payload
  }
}
export const updateSuccess = userUpdated => {
  return {
    type: UPLOAD_USER_PROFILE_SUCCESS,
    payload: userUpdated.data.data.user
  }
}
export const updateFailed = (password=false, error) => {
  return {
    type: password ? UPDATE_USER_PASSWORD_FAILED:UPLOAD_USER_PROFILE_FAILED,
    payload: error
  }
}

export const updatePasswordSuccess = userUpdated => {
  return {
    type: UPDATE_USER_PASSWORD_SUCCESS,
    payload: userUpdated
  }
}