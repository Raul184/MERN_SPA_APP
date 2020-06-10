import React from 'react'
import './header.style.scss'
import {Link} from 'react-router-dom'
import Logo from './logo-white.png'

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
        <button className="nav__el">Log in</button>
        <button className="nav__el">Sign up</button>
      </nav>
    </header>
  )
}

export default Header;