import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {updateStart} from '../../redux/users/user.action'

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
    console.log('SUBMIT');
    updateStart({name,email})
  }
  return (
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
        { profile.photo && <img
          className="form__user-photo"
          src={require(`../../assets/users/${profile.photo}`)}
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
  )
}

export default connect(
  null,
  {updateStart}
)(ProfileForm);
