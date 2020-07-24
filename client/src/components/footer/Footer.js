import React from 'react'
import './footer.style.scss'
import {Link} from 'react-router-dom'
import Logo from './logo-green.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={Logo} alt="Freaking-Tours_Logo"/>
      </div>
      <ul className="footer_nav">
        <li><Link className='list' to="/">About us</Link></li>
        <li><Link className='list' to="/">Download app</Link></li>
        <li><Link className='list' to="/">Become a guide</Link></li>
        <li><Link className='list' to="/">Careers</Link></li>
        <li><Link className='list' to="/">Contact</Link></li>
      </ul>
      <p className="footer__copyright">
        &copy; by Raul M. All rights reserved.
      </p>
    </div>
  )
}

export default React.memo(Footer);