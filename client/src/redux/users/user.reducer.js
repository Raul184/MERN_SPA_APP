import {
  LOGIN_USER_STARTS, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED,
  SIGN_UP_USER_STARTS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  UPLOAD_USER_PROFILE_SUCCESS,
  UPLOAD_USER_PROFILE_FAILED
} from './types'

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  loading: false, 
  error: null,
  profile: null
};


const userReducer = (state = INITIAL_STATE, action) => {
  const { type , payload } = action
  switch (type) {
    case LOGIN_USER_STARTS:
    case SIGN_UP_USER_STARTS:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user:null,
        isAuth: false
      }
    case LOGIN_USER_SUCCESS:
    case SIGN_UP_USER_SUCCESS:
    case LOGOUT_USER_FAILED:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
        profile: payload
      }
    case UPLOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth:true,
        profile:payload
      }
    case LOGIN_USER_FAILED:
    case SIGN_UP_USER_FAILED:
    case UPLOAD_USER_PROFILE_FAILED:
      return{
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
};

export default userReducer;
