import React from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {grabUser,grabLoading} from '../../redux/users/user.selectors'
import { Link } from 'react-router-dom';

const MeProfile = ({profile,loading}) => {
  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li><Link to='#'>Settings</Link></li>
            <li><Link to='#'>My bookings</Link></li>
            <li><Link to='#'>My reviews</Link></li>
            <li><Link to='#'>Billing</Link></li>
          </ul>
        </nav>
      </div>
    </main>
      
  )
}


const mapStateToProps = createStructuredSelector({
  profile: grabUser,
  loading: grabLoading
})

export default connect(
mapStateToProps ,
null
)(MeProfile);