import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { grabProfile } from '../../redux/users/user.selectors';
const stripePromise = loadStripe('pk_test_qpk8XXIK4nkQNnyLqJ3RH5Mt009GgCH5Lr');

const PayStripe = ({match,userDb}) => {
  const handleClick = async () => {
    console.log('clicked');
    try {
      // 1) Get checkout session from API
      const session = await axios(`/api/v1/bookings/checkout-session/${match.params.tourId}`);
      console.log('CLICKED', session.data.session.id);
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
  return (
    <button 
      className="btn btn--green span-all-rows"
      onClick={handleClick}
    >
      <span>{userDb !== null ? 'Book Tour Now!' : 'Login to book'}</span>
    </button>
  )
}


const mapStateToProps = createStructuredSelector({
  userDb: grabProfile
})
export default connect(
  mapStateToProps,
  null
)(React.memo(PayStripe))