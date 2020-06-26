import {
  LOGIN_USER_STARTS, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED,
  SIGN_UP_USER_STARTS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILED,
  FETCH_USER_PROFILE_STARTS
} from './types'

const INITIAL_STATE = {
  user: null,
  loading: false, 
  error: null,
  profile: null
};


const userReducer = (state = INITIAL_STATE, action) => {
  const { type , payload } = action
  switch (type) {
    case LOGIN_USER_STARTS:
    case SIGN_UP_USER_STARTS:
    case FETCH_USER_PROFILE_STARTS:
      return {
        ...state,
        loading: true,
        error: null,
        profile:null
      }
    case LOGIN_USER_SUCCESS:
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload
      }
    case FETCH_USER_PROFILE_SUCCESS:
      return{
        ...state,
        loading:false,
        profile: payload
      }
    case LOGIN_USER_FAILED:
    case SIGN_UP_USER_FAILED:
    case FETCH_USER_PROFILE_FAILED:
      return{
        ...state,
        loading: false,
        error: payload,
        profile: null
      }
    default:
      return state;
  }
};

export default userReducer;
