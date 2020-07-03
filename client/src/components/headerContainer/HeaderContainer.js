import React from 'react'
import './header.style.scss'
import {connect} from 'react-redux'
import {logoutStart} from '../../redux/users/user.action'
import {grabProfile} from '../../redux/users/user.selectors'
import {createStructuredSelector} from 'reselect'
import HeaderAuth from '../headerUser/HeaderAuth'
import Header from '../header/Header'
const HeaderContainer = ({userDb,logoutStart}) => {
  const handleLogout = e => {
    e.preventDefault()
    logoutStart()
  }
  return userDb !== null ?
    <HeaderAuth userDb={userDb} handleLogout={handleLogout}/>
    :
    <Header />
}

const mapStateToProps = createStructuredSelector({
  userDb: grabProfile
})
export default connect(
  mapStateToProps,
  {logoutStart}
)(React.memo(HeaderContainer))
