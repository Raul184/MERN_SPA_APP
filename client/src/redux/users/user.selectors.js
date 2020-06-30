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
  all => all.user
)
// Grab loading
export const grabLoading = createSelector(
  [getUser],
  all => all.loading
)
// User auth?
export const grabAuth = createSelector(
  [getUser],
  all => all.isAuth
)
// Grab profile
export const grabProfile = createSelector(
  [getUser],
  all => all.profile
)