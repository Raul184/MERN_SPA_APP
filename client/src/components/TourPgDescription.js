import React from 'react'
import Icons from '../assets/icons.svg'
import CardGuides from './cardGuides/CardGuides'
const TourPgDescription = ({
  name,
  format,
  difficulty,maxGroupSize,ratingsAverage,guides,parapraphs}) => {
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
          <div className="overview-box__group">
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`${Icons}#icon-calendar`} />
              </svg>
              <span className="overview-box__label">{'Next date'}</span>
              <span className="overview-box__text">{format}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`${Icons}#icon-trending-up`} />
              </svg>
              <span className="overview-box__label">{'Difficulty'}</span>
              <span className="overview-box__text">{difficulty}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`${Icons}#icon-user`} />
              </svg>
              <span className="overview-box__label">{'Participants'}</span>
              <span className="overview-box__text">{maxGroupSize}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`${Icons}#icon-star`} />
              </svg>
              <span className="overview-box__label">{'Ratings'}</span>
              <span className="overview-box__text">{ratingsAverage}</span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">
              Your tour guides
            </h2>
            {guides.map((el,I) => <CardGuides key={I} el={el} />)}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">
          {`About ${name} tour`}
        </h2>
        {parapraphs.map((el, i) =>
          <p key={i} className="description__text">{el}</p>
        )}
      </div>
    </section>
  )
}
export default React.memo(TourPgDescription);