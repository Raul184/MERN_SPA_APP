import React from 'react'

const PasswordForm = () =>  {
  const handleSubmit = () => {
    console.log('SUBMIT');
  }
  return <form className="form form-user-password"
    onSubmit={handleSubmit}
    >
    <div className="form__group">
      <label className="form__label" htmlFor="password-current">
        Current password
      </label>
      <input
        className="form__input"
        id="password-current"
        type="password"
        placeholder="••••••••"
        required
        minLength="8"
      />
    </div>
    <div className="form__group">
      <label className="form__label" htmlFor="password">
        New password
      </label>
      <input
        className="form__input"
        id="password"
        type="password"
        placeholder="••••••••"
        required
        minLength="8"
      />
    </div>
    <div className="form__group ma-bt-lg">
      <label className="form__label" htmlFor="password-confirm">
        Confirm password
      </label>
      <input
        className="form__input"
        id="password-confirm"
        type="password"
        placeholder="••••••••"
        required
        minLength="8"
      />
    </div>
    <div className="form__group right">
      <button
        type="submit"
        className="btn btn--small btn--green btn--save-password"
      >
        Save password
      </button>
    </div>
  </form>
}

export default PasswordForm;