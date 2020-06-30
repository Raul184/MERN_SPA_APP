import { createSelector } from 'reselect'


// Grab user on Login
const getUser = state => state.user
export const grabUser = createSelector(
  [getUser],
  all => all.user
)
export const grabUserSignUp = createSelector(
  [getUser],
  all => all.user
)
export const grabLoading = createSelector(
  [getUser],
  all => all.loading
)
export const grabError = createSelector(
  [getUser],
  all => all.error
)
export const grabAuth = createSelector(
  [getUser],
  all => all.isAuth
)
export const grabProfile = createSelector(
  [getUser],
  all => all.profile
)