import React from 'react';
import './meProfile.style.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { grabLoading,grabProfile} from '../../redux/users/user.selectors';
import AdminNav from '../../components/adminNav/adminNav'
import ProfileNav from '../../components/profileNav/ProfileNav'
import ProfileForm from '../../components/profileForm/ProfileForm'
import PasswordForm from '../../components/passwordForm/PasswordForm'
import Spinner from '../../components/spinner/Spinner'
const MeProfile = ({loading,profile}) => loading ? 
  <Spinner /> : 
  <div className="main">
  <div className="user-view">
    <nav className="user-view__menu">
      <ProfileNav/>
      {!loading && profile !== undefined && profile.role === 'admin' && <AdminNav/>}
    </nav>
    <div className="user-view__content">
      <ProfileForm />
      <div className="line">&nbsp;</div>
      <PasswordForm />
    </div>
  </div>
</div>


const mapStateToProps = createStructuredSelector({
  profile: grabProfile,
  loading: grabLoading
});

export default connect(mapStateToProps, null)(MeProfile);
