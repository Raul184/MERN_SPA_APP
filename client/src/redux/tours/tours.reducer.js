import {
  FETCH_TOURS_STARTS, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILED
} from './types'

const INITIAL_STATE = {
  tours: null ,
  loading: false, 
  error: null
};


const userReducer = (state = INITIAL_STATE, action) => {
  const { type , payload } = action
  switch (type) {
    case FETCH_TOURS_STARTS:
      return {
        ...state,
        loading: true
      }
    case FETCH_TOURS_SUCCESS:
      return{
        ...state,
        loading: false,
        tours: payload.data
      }
    case FETCH_TOURS_FAILED:
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
