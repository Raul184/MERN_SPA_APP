import{
  FETCH_TOURS_STARTS, 
  FETCH_TOURS_SUCCESS, 
  FETCH_TOURS_FAILED,
  FETCH_TOUR_STARTS,
  FETCH_TOUR_SUCCESS,
  FETCH_TOUR_FAILED
} from './types'



export const fetchStart = (all=true, payload) => {
  return {
    type: all ? FETCH_TOURS_STARTS : FETCH_TOUR_STARTS,
    payload
  }
}
export const fetchSuccess = (all=true ,data) => {
  return {
    type: all ? FETCH_TOURS_SUCCESS : FETCH_TOUR_SUCCESS,
    payload: data
  }
}
export const fetchFailed = (all=true, err) => {
  return {
    type: all ? FETCH_TOURS_FAILED : FETCH_TOUR_FAILED,
    payload: err
  }
}