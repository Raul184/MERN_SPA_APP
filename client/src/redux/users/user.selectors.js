import { createSelector } from 'reselect'


// Grab user on Login
const getUser = state => state.user
export const grabUser = createSelector(
  [getUser],
  all => all.user
  )

// Grab user on SignUp
export const grabUserSignUp = createSelector(
  [getUser],
  all => all.user.data
  )

// Grab loading
export const grabLoading = createSelector(
  [getUser],
  all => all.loading
)