import React, {useState} from 'react'
import './login.style.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {grabUser,grabLoading} from '../../redux/users/user.selectors'
import {loginStart} from '../../redux/users/user.action'
import Loading from '../../components/onLoading/OnLoading'

const Login = ({onLoading,loginStart}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    loginStart(true, {email, password})
    setEmail('')
    setPassword('')
  }

  return onLoading ? <Loading /> : (
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
  user: grabUser,
  onLoading: grabLoading
})

export default connect(
  mapStateToProps,
  {loginStart}
)(Login);