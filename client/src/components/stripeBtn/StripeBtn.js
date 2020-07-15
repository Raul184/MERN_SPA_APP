import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY_TEST;
  const onToken = token => {
    axios.post('/payment' ,{amount: priceForStripe ,token})
    .then( 
      res => alert('Payment Succesful!')
    )
    .catch(
      err => {
        console.log('Payment error:' , err)
        alert('There was an issue with your payment method')
      }
    )
  };

  return (
    <StripeCheckout
      label='Book Now'
      name='FreakingTours Ltd.'
      billingAddress
      shippingAddress
      image={require('../../assets/pin.png')}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Book Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;