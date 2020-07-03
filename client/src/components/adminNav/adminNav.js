import React from 'react'
import Icons from '../../assets/icons.svg'
import { Link } from 'react-router-dom';
const AdminNav = () => <div className="admin-nav">
  <h5 className="admin-nav__heading">Admin</h5>
  <ul className="side-nav">
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-map`}/>
        </svg>
        Manage Tours
      </Link>
    </li>
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-users`}/>
        </svg>
        Manage Users
      </Link>
    </li>
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-star`}/>
        </svg>
        Manage Reviews
      </Link>
    </li>
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-briefcase`}/>
        </svg>
        Manage Bookings
      </Link>
    </li>
  </ul>
</div>
export default React.memo(AdminNav);