import React from 'react'
import './header.style.scss'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Logo from '../../assets/logo-white.png'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {grabUser} from '../../redux/users/user.selectors'
const Header = ({user}) => {
  const handleLogout = () => {
    Cookies.remove('__session')
    window.location.reload(); 
    return <Redirect to='/'/>
  }
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to='/'>All tours</Link>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="Natours logo"/>
      </div>
      <nav className="nav nav--user">
        {user ? <>
          <Link 
            className="nav__el nav__el--logout"
            to='/logout' 
            onClick={handleLogout} 
          >
             Log out
          </Link>
          <Link to='/me' className="nav__el">
            <img 
              className="nav__user-img"
              src={require(`../../assets/users/${user.data.user.photo}`)} 
              alt={`${user.data.user.name}`} 
            />
            <span>{`${user.data.user.name.split(' ')[0]}`}</span>
          </Link></>
          :
          <>  
            <Link to='/login' className="nav__el">Log in</Link>
            <Link to='/signup' className="nav__el">Sign up</Link>
          </>
        }
      </nav>
    </header>
  )
}

const mapStateToProps = createStructuredSelector({
  user: grabUser
})
export default connect(
  mapStateToProps,
  null
)(Header);