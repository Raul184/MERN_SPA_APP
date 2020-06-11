import{
  GET_TOURS_STARTS, GET_TOURS_SUCCESS, GET_TOURS_FAILED
} from './types'



export const getToursStart = () => {
  return {
    type: GET_TOURS_STARTS 
  }
}
export const getToursSuccess = () => {
  return {
    type: GET_TOURS_SUCCESS 
  }
}
export const getToursFailed = () => {
  return {
    type: GET_TOURS_FAILED 
  }
}