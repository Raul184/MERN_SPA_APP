const jwt = require('jsonwebtoken');
// Filter Query Object when user is updating account
const filterObj = ( obj , ...allowedFields ) => {
  const nueObj = {}
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)){
      nueObj[el] = obj[el]
    }
  })
  return nueObj;
}
  
module.exports = filterObj;


// Send Token when auth is verified
const signYsendToken = (statusCode , user , res , sent=true ) => {
  const token = jwt.sign(
    { id: user._id} , 
    process.env.JWT_SECRET ,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  return res.status(statusCode).json({
    status: 'success',
    token : sent ? token : '' ,
    data: user
  })  
}

module.exports = signYsendToken;