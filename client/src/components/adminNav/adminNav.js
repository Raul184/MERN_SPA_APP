import React from 'react'
import Icons from '../../assets/icons.svg'
import { Link } from 'react-router-dom';
const AdminNav = () => <div className="admin-nav">
  <h5 className="admin-nav__heading">Admin</h5>
  <ul className="side-nav">
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-credit-card`}/>
        </svg>
        Billing
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
    <li>
      <Link to="#">
        <svg>
          <use xlinkHref={`${Icons}#icon-credit-card`}/>
        </svg>
        Billing
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
</div>
export default AdminNav;