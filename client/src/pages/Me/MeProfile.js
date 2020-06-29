import React from 'react';
import './meProfile.style.scss';
import { useSelector } from 'react-redux';
import { grabProfile, grabLoading } from '../../redux/users/user.selectors';
import AdminNav from '../../components/adminNav/adminNav'
import ProfileNav from '../../components/profileNav/ProfileNav'
import ProfileForm from '../../components/profileForm/ProfileForm'
import PasswordForm from '../../components/passwordForm/PasswordForm'
import Spinner from '../../components/spinner/Spinner'
const MeProfile = () => {
  const profile = useSelector(grabProfile)
  const loading = useSelector(grabLoading)
  return (
    loading ? <Spinner /> : 
    <div className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ProfileNav/>
          {profile !== null && profile.role === 'admin' && <AdminNav/>}
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <ProfileForm profile={profile} />
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <PasswordForm />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MeProfile;
