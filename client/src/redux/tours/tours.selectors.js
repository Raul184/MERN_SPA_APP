import { createSelector } from 'reselect'


// Grab all tours
const getTours = state => state.toursDb
export const grabTours = createSelector(
  [ getTours ],
  (allTours) => allTours.tours
  )
  
// Get 1 tours 
export const grab1Tour = urlParam => createSelector(
  [grabTours],
  toursCollection => toursCollection[urlParam]
)

// Grab booked tours
export const grabBookedTours = createSelector(
  [getTours],
  allTours => allTours.bookedTours
)

// Grab loading
const getLoading = state => state.toursDb
export const grabLoading = createSelector(
  [getLoading],
  onLoad => onLoad.loading
)
