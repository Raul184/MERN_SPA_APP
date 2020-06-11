import{
  FETCH_TOURS_STARTS, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILED
} from './types'



export const fetchToursStart = () => {
  return {
    type: FETCH_TOURS_STARTS
  }
}
export const fetchToursSuccess = data => {
  return {
    type: FETCH_TOURS_SUCCESS,
    payload: data
  }
}
export const fetchToursFailed = err => {
  return {
    type: FETCH_TOURS_FAILED,
    payload: err
  }
}