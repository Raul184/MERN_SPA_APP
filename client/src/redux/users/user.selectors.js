import { createSelector } from 'reselect'


// Grab all tours
const getUser = state => state.user
export const grabUser = createSelector(
  [ getUser ],
  (all) => all.user
  )
  
// Grab loading
export const grabLoading = createSelector(
  [getUser],
  all => all.loading
)
