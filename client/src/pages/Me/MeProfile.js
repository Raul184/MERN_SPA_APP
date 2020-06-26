import React from 'react';
import './meProfile.style.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { grabUser, grabLoading } from '../../redux/users/user.selectors';
import { Link } from 'react-router-dom';

const MeProfile = ({ profile, loading }) => (
  <div className="main">
    <div className="user-view">
      <nav className="user-view__menu">
        <ul className="side-nav">
          <li className="side-nav--active">
            <Link to="#">
              <svg>
                <use xlinkHref="img/icons.svg#icon-settings" />
              </svg>
              Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <svg>
                <use xlinkHref="img/icons.svg#icon-briefcase" />
              </svg>
              My bookings
            </Link>
          </li>
          <li>
            <Link to="#">
              <svg>
                <use xlinkHref="img/icons.svg#icon-star" />
              </svg>
              My reviews
            </Link>
          </li>
          <li>
            <Link to="#">
              <svg>
                <use xlinkHref="img/icons.svg#icon-credit-card" />
              </svg>
              Billing
            </Link>
          </li>
        </ul>
      </nav>

      <div className="user-view__content">
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
          <form className="form form-user-data">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                value="Edu Me"
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
                value="edu@gmail.com"
                name="email"
              />
            </div>
            <div className="form__group form__photo-upload">
              <img
                className="form__user-photo"
                src={require("../../assets/users/user-18.jpg")}
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
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Password change</h2>
          <form className="form form-user-password">
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
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  profile: grabUser,
  loading: grabLoading
});

export default connect(mapStateToProps, null)(MeProfile);
