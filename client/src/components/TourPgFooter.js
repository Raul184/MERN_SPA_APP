import React from 'react'
import Logo from '../assets/logo-white.png'
const TourPgFooter = ({images}) => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src={Logo} alt="Tour"/>  
        </div>
        <img
          className="cta__img cta__img--1"
          src={require(`../assets/imgs/tours/${images[1]}`)} 
          alt="Tour"
        />
        <img
          className="cta__img   cta__img--2" 
          src={require(`../assets/imgs/tours/${images[2]}`)} 
          alt="Tour"
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">1 adventure | Infinite Memories | Make it yours today!</p>
          <button className="btn btn--green span-all-rows">Book tour now</button>
        </div>  
      </div>
    </section>
  )
}
export default React.memo(TourPgFooter);