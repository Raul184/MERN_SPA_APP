import {
  GET_TOURS_STARTS
} from './types'

const INITIAL_STATE = {
  tours: null ,
  loading: false, 
  error: null
};


const userReducer = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
    case GET_TOURS_STARTS:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

export default userReducer;
