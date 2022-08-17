import { useRef, useReducer } from 'react'

const LoginAccountForm = ({ redirect, isCheckout, onForgotPasswordClick }) => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const onSubmit = async (e) => {

  }

  return (
    <div className={`login-form`}>
        <div className='login-form__header'>Log in to my Healthybaby account</div>
        <div className='login-form__icons'>

        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-group">
            <input type="email" className="input" placeholder="email address" ref={emailRef} />
          </div>
          <div className="input-group">
            <input type="password" className="input" placeholder="password" ref={passwordRef} />
          </div>
          <div className="login-form__button-wrapper">
              <button className="btn">Login</button>
              <button
                onClick={() => onForgotPasswordClick()}
                className="btn">Forgot Your Password?</button>
          </div>
        </form>
    </div>
  )
}

export default LoginAccountForm