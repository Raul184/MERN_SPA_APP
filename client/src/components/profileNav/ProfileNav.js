import React from 'react'
import { Link } from 'react-router-dom';
import Icons from '../../assets/icons.svg'

const ProfileNav = () => <ul className="side-nav">
  <li className="side-nav--active">
    <Link to="#">
      <svg>
        <use xlinkHref={`${Icons}#icon-settings`} />
      </svg>
      Settings
    </Link>
  </li>
  <li>
    <Link to="#">
      <svg>
        <use xlinkHref={`${Icons}#icon-briefcase`}/>
      </svg>
      My bookings
    </Link>
  </li>
  <li>
    <Link to="#">
      <svg>
        <use xlinkHref={`${Icons}#icon-star`}/>
      </svg>
      My reviews
    </Link>
  </li>
  <li>
    <Link to="#">
      <svg>
        <use xlinkHref={`${Icons}#icon-credit-card`}/>
      </svg>
      Billing
    </Link>
  </li>
</ul>

export default ProfileNav;