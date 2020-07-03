import React from 'react'
import Icons from '../assets/icons.svg'
const TourPgHeader = ({name,imageCover,duration,startLocation}) => {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img 
            className="header__hero-img"
            src={require(`../assets/imgs/tours/${imageCover}`)} 
            alt={`${name}`} 
          />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{`${name}`}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref={`${Icons}#icon-clock`} />
            </svg>
            <span className="heading-box__text">{`${duration} days`}</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref={`${Icons}#icon-map-pin`} />
            </svg>
            <span className="heading-box__text">{`${startLocation.description}`}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(TourPgHeader);