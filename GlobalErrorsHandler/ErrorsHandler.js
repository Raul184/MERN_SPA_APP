const sendErrorDev = ( err , res ) => {
  console.log(process.env.NODE_ENV);
  res.status(err.statusCode).json({
    status: err.status ,
    error: err ,
    message: err.message ,
    stack: err.stack
  })
}
const sendErrorPro = ( err , res ) => {
  console.log(process.env.NODE_ENV);
  console.log(err.isOperational);
  if( err.isOperational){
    res.status(err.statusCode).json({
      status: err.status ,
      message: err.message
    })
  }
  else{
    console.error('ERROR' , err )
    res.status(500).json({
      status: 'error' ,
      message: 'Something went wrong'
    })
  }
}

module.exports = ( err , req , res , next ) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || `error` 
  
  if(process.env.NODE_ENV === 'development'){
    sendErrorDev( err , res )
  }
  else if(process.env.NODE_ENV === 'production'){
    // let error = { ...err }
    // error.message = err.message;
    

    sendErrorPro( err , res )
  }
} 