import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { grabProfile } from '../../redux/users/user.selectors';
import  { Link } from 'react-router-dom'
const stripePromise = loadStripe('pk_test_qpk8XXIK4nkQNnyLqJ3RH5Mt009GgCH5Lr');

const PayStripe = ({match,userDb}) => {
  const handleClick = async () => {
    try {
      // 1) Get checkout session from API
      const session = await axios(`/api/v1/bookings/checkout-session/${match.params.tourId}`);
  
      // 2) Create checkout form + charge credit card
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });
    } 
    catch (err) {
      console.log(err);
    }
  }
  return userDb !== null ? <button 
    className="btn btn--green span-all-rows"
    onClick={handleClick}
  >
    <span>Book Tour Now!</span>
  </button> 
  : 
  <button className="btn btn--green span-all-rows">
    <Link to='/login' style={{textDecoration:'none', color:'white'}}>Login to book</Link>
  </button>  
}

const mapStateToProps = createStructuredSelector({
  userDb: grabProfile
})
export default connect(
  mapStateToProps,
  null
)(React.memo(PayStripe))