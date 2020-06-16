import React from 'react'
import './tour.style.scss'
import {connect} from 'react-redux'
import {grab1Tour,grabLoading} from '../../redux/tours/tours.selectors'
import {fetchStart} from '../../redux/tours/tours.action'
import Loading from '../../components/onLoading/OnLoading'
import Icons from '../../assets/icons.svg'
import CardIcons from '../../components/cardIcons/CardIcons'
import CardGuides from '../../components/cardGuides/CardGuides'
import CardPics from '../../components/cardPics/CardPics'
import CardReviews from '../../components/cardReviews/CardReviews'
import Logo from '../../assets/logo-white.png'

const Tour = ({tour,onLoading}) => {
  const{
    imageCover,
    name,
    duration,
    startLocation,
    startDates,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    description,
    guides,
    images} = tour
  const format= new Date(startDates[0]).toLocaleString(
    'en-us',{month:'long' ,year:'numeric'}
  )
  const parapraphs = description.split('\n');
  return (
    onLoading ? <Loading /> :<>
      <div className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img 
              className="header__hero-img"
              src={require(`../../../public/img/tours/${imageCover}`)} 
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
      </div>
      <div className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
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
      </div>
      <div className="section-pictures">
        {images.map(
          (el,i) => <CardPics key={i} el={el} i={i}/>
        )}
      </div>
      <div className="section-map">
        <div id="marker"></div>
      </div>
      {/* <div className="section-reviews">
        <div className="reviews">
          {reviews.map(el => <CardReviews el={el} />)}
        </div>
      </div> */}
      <div className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src={Logo} alt="Tour"/>  
          </div>
          <img
            className="cta__img cta__img--1"
            src={require(`../../../public/img/tours/${images[1]}`)} 
            alt="Tour picture"
          />
          <img
            className="cta__img   cta__img--2" 
            src={require(`../../../public/img/tours/${images[2]}`)} 
            alt="Tour picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">1 adventure | Infinite Memories | Make it yours today!</p>
            <button className="btn btn--green span-all-rows">Book tour now</button>
          </div>  
        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state , ownProps) => ({
  tour: grab1Tour(ownProps.match.params.tourId)(state),
  onLoading: grabLoading(state)
})
export default connect(
  mapStateToProps,
  {fetchStart}
)(Tour);