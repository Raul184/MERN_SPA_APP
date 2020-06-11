import {
  GET_TOURS_STARTS, GET_TOURS_SUCCESS, GET_TOURS_FAILED
} from './types'

const INITIAL_STATE = {
  tours: null ,
  loading: false, 
  error: null
};


const userReducer = (state = INITIAL_STATE, action) => {
  const { type , payload } = action
  switch (type) {
    case GET_TOURS_STARTS:
      return {
        ...state,
        loading: true
      }
    case GET_TOURS_SUCCESS:
      return{
        ...state,
        loading: false,
        tours: payload
      }
    case GET_TOURS_FAILED:
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
