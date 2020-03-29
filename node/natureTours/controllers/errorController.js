const AppError = require('../utils/ErrorHandler');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError( message , 400);
}

const handleJWTError = error => new AppError('Invalid Token' , 401)

const handleJWTExpired = error => new AppError('Token Expired' , 401)
module.exports = (err , req , res , next ) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development'){
    return res.status(err.statusCode).json({
      status: err.status ,
      err: err ,
      message: err.message ,
      stack: err.stack
    });
  }
  // Operational Errors  
  if(process.env.NODE_ENV === 'production' && err.isOperational ){
    return res.status(err.statusCode).json({
      status: err.status ,
      message: err.message 
    });
  } // Programming Errors
  else if(process.env.NODE_ENV === 'production')
  {
    let error = { ...err };
    if(error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if(error.name === 'TokenExpiredError') error = handleJWTExpired(error)
    return res.status(500).json({
      status: 'error',
      message: 'Something wrong just happened , sorry'
    })
  }
}