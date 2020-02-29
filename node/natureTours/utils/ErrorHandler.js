import React, { Component } from 'react'

class ErrorHandler extends Error {
  constructor(message , statusCode){
    super(message);
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 
    'fail' 
    : 
    'error'
    this.isOperational = true
    Error.captureStackTrace( this, this.constructor );
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}


module.exports = ErrorHandler;