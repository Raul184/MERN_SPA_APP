// Stripe obj to make charges
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.payStripe = ( req , res , next ) => {
  // Necessary Data to process payment
  const body = {
    source: req.body.token.id ,
    amount: req.body.amount ,
    currency: 'usd'
  };
  // Charge
  stripe.charges.create(
    body , 
    ( stripeRes , stripeErr ) => {
      if(stripeErr){
        stripeRes.status(500).json({ error: stripeErr })
      }
      else{
        return stripeRes.status(200).json({ msg: res })
      }
    }
  )
}