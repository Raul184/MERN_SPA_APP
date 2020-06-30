import React, {useState} from 'react'
import './login.style.scss'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {grabLoading, grabError,grabAuth} from '../../redux/users/user.selectors'
import {loginStart} from '../../redux/users/user.action'
import Spinner from '../../components/spinner/Spinner'
import Alert from '../../components/alert/Alert'
const Login = ({onLoading,error,isAuth, loginStart,history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = e => {
    e.preventDefault()
    loginStart(true, {email, password})
    setEmail('')
    setPassword('')
  }
  return onLoading ? <Spinner /> : 
  !onLoading && isAuth ? <Redirect to='/me'/> :
  (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Login</h2>
        <form className="form form--login" onSubmit={handleLogin}>
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
          <div className="form__group">
            <button type='submit' className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  )
}

const mapStateToProps = createStructuredSelector({
  onLoading: grabLoading,
  error:grabError,
  isAuth: grabAuth
})

export default connect(
  mapStateToProps,
  {loginStart}
)(Login);