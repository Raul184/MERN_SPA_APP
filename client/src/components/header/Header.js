import React from 'react'
import './header.style.scss'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Logo from '../../assets/logo-white.png'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {grabUser} from '../../redux/users/user.selectors'
const Header = ({userDb}) => {
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
        {userDb ? <>
          <Link 
            className="nav__el nav__el--logout"
            to='/logout' 
            onClick={handleLogout} 
          >
             Log out
          </Link>
          <Link to='/me' className="nav__el">
            {
              userDb.data.user.photo && <img className="nav__user-img"
              src={require(`../../assets/users/${userDb.data.user.photo}`)} 
              alt={`${userDb.data.user.name}`} 
            />
            }
            <span>{`${userDb.data.user.name}`}</span>
          </Link>
          </>
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
  userDb: grabUser
})
export default connect(
  mapStateToProps,
  null
)(Header);