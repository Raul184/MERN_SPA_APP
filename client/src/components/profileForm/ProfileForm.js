import React,{useEffect,useState} from 'react'
import './profileForm.styles.scss'
import {connect} from 'react-redux'
import {updateStart} from '../../redux/users/user.action'
import { grabLoading,grabProfile} from '../../redux/users/user.selectors';
import { createStructuredSelector } from 'reselect';

const ProfileForm = ({profile,updateStart}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    setName(profile.name)
    setEmail(profile.email)
  }, 
  [profile.email,profile.name])

  const handleSubmit = e => {
    e.preventDefault();
    //multipart form data
    const form = new FormData()
    form.append('name', name)
    form.append('email', email)
    form.append('photo', document.getElementById('photo').files[0])
    updateStart(false, form)
  }
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
    <form 
      className="form form-user-data"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="form__group">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          id="name"
          type="text"
          value={name}
          name="name"
          required
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form__group ma-bt-md">
        <label className="form__label" htmlFor="email">
          Email address
        </label>
        <input
          className="form__input"
          id="email"
          type="email"
          value={email}
          name="email"
          required
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form__group form__photo-upload">
        { profile.photo ? <img
          className="form__user-photo"
          src={require(`../../assets/users/${profile.photo}`)}
          alt="User"
        />
        :
        <img
          className="form__user-photo"
          src={require(`../../assets/users/default.jpg`)}
          alt="User"
        />}
        <label htmlFor="photo">Choose new photo</label>
        <input
          className="form__upload"
          type="file"
          accept="image/*"
          id="photo"
          name="photo"
        />
      </div>
      <div className="form__group right">
        <button type="submit" className="btn btn--small btn--green">
          Save settings
        </button>
      </div>
    </form>
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  profile: grabProfile,
  loading: grabLoading
});

export default connect(
  mapStateToProps,
  {updateStart}
)(ProfileForm);
