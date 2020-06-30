import React from 'react'

const Alert = ({type,msg}) => <div class={`alert alert--${type}`}>{msg}</div>
export default Alert;


