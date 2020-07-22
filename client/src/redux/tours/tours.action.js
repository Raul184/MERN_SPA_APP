import{ 
  FETCH_TOURS_SUCCESS, 
  FETCH_TOURS_FAILED,
  FETCH_TOUR_SUCCESS,
  FETCH_TOUR_FAILED,
  GRAB_BOOKED_TOURS_SUCCESS,
  GRAB_BOOKED_TOURS_FAILED
} from './types'


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
export const grabBookedToursSuccess = payload => {
  return {
    type: GRAB_BOOKED_TOURS_SUCCESS,
    payload
  }
}
export const grabBookedToursFailed = payload => {
  return {
    type: GRAB_BOOKED_TOURS_FAILED,
    payload
  }
}