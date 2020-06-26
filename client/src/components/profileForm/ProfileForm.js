import React from 'react'

const ProfileForm = ({profile}) => {
  const handleSubmit = () => {
    console.log('SUBMIT');
  }
  return <form className="form form-user-data"
    onSubmit={handleSubmit}
    >
    <div className="form__group">
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        id="name"
        type="text"
        value={profile.name}
        name="name"
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
        value={profile.email}
        name="email"
      />
    </div>
    <div className="form__group form__photo-upload">
      <img
        className="form__user-photo"
        src={require(`../../assets/users/${profile.photo}`)}
        alt="User"
      />
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
}
export default ProfileForm;
