import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../assets/logo-white.png'
const Header = () => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to='/'>All tours</Link>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="Natours logo"/>
      </div>
      <nav className="nav nav--user">
        <Link to='/login' className="nav__el">Log in</Link>
        <Link to='/signup' className="nav__el">Sign up</Link>
      </nav>
    </header>
  )
}
export default React.memo(Header);