import React ,{useState} from 'react'
import {connect} from 'react-redux'
import {loginStart} from '../../redux/users/user.action'
import {Redirect} from 'react-router-dom'
const Signup = ({loginStart}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setConfirm] = useState('')  

  const handleSubmit = e => {
    console.log('running');
    e.preventDefault()
    if(password !== passwordConfirm){
      return alert(`Sorry, passwords don't match`)
    }
    loginStart(false, {name,email, password,passwordConfirm})
    setName('')
    setEmail('')
    setPassword('')
    setConfirm('') 
    return <Redirect to='/'/>
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign Up</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
        <div className="form__group">
            <label htmlFor="fullname" className="form__label">Fullname</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="form__input" 
                placeholder='fullname' 
                required
              />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">Email address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form__input" 
                placeholder='you@example.com' 
                required
              />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">Password</label> 
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form__input"
                placeholder='••••••••'
                minLength='8'
                required
              />    
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">Confirm your password</label> 
              <input 
                type="password" 
                id="passwordConfirm" 
                value={passwordConfirm}
                onChange={e => setConfirm(e.target.value)}
                className="form__input"
                placeholder='••••••••'
                minLength='8'
                required
              />    
          </div>
          <div className="form__group">
            <button type='submit'className="btn btn--green">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default connect(
  null,
  {loginStart}
)(Signup);