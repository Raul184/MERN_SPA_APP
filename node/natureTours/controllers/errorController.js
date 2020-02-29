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
    console.error(err)   
    res.status(500).json({
      status: 'error',
      message: 'Something wrong just happened , sorry'
    })
  }
}