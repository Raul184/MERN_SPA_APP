import React from 'react'
import {connect} from 'react-redux'
import {grab1Tour,grabLoading} from '../../redux/tours/tours.selectors'
import {fetchStart} from '../../redux/tours/tours.action'
import Loading from '../../components/onLoading/OnLoading'


const Tour = ({onLoading,match}) => {
  console.log('URL', match.params.tourId);
  return (
    onLoading ? <Loading /> :<>
      <div className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">
            <img src="" alt="" className="header__hero-img"/>
          </div>
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>SINGLE Page TOUR</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon"></svg>
              <span className="heading-box__text">10 days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon"></svg>
              <span className="heading-box__text">Las Vegas, USA</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section-description">
        <div className="overview-box">
        </div>
      </div>
      <div className="overview-box">
        <div className="overview-box__group">
          <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
          <div className="overview-box__detail">
            <svg className="overview-box__icon">
            {/* use(xlink:href='/img/icons.svg#icon-calendar') */}
            </svg>
            <span className="overview-box__label">Next date</span>
            <span className="overview-box__text">August 2021</span>
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">TEST</h2>
        <p className="description__text"></p>
        <p className="description__text"></p>
      </div>
      <div className="section-pictures">
        <div className="picture-box">
          <img src="" alt="" className="picture-box__img picture-box__img--1"/>
        </div>
      </div>
      <div className="section-map">
        <div id="marker"></div>
      </div>
      <div className="section-reviews">
        <div className="reviews">
          <div className="reviews__card">
            <div className="reviews__avatar"></div>
            <p className="reviews"></p>
            <div className="reviews__rating">
              <svg className="reviews__star reviews__start--active">
                use(xlink:href='/img/icons.svg#icon-star')
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo"></div>
          <img src="" alt="" className="cta__img cta__img--1"/>
          <img src="" alt="" className="cta__img   cta__img--2"/>
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