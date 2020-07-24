import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo-white.png'
const HeaderAuth = ({userDb,handleLogout}) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to='/'>All tours</Link>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="Freaking-tours logo"/>
      </div>
      <nav className="nav nav--user">
        <Link 
          className="nav__el nav__el--logout"
          to='#' 
          onClick={handleLogout} 
        >
           Log out
        </Link>
        <Link to='/me' className="nav__el">
          {userDb!== undefined && <>
            {userDb.photo !== '' ? <img className="nav__user-img"
              src={require(`../../assets/users/${userDb.photo}`)} 
              alt={`${userDb.name}`} 
            />
            :
            <img className="nav__user-img"
              src={require(`../../assets/users/default.jpg`)} 
              alt={`${userDb.name}`} 
            />}
            <span>{userDb !== undefined &&`${userDb.name}`}</span>
            </>
          }
        </Link>
      </nav>
    </header>
  )
}
export default React.memo(HeaderAuth);