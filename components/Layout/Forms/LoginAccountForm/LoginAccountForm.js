import { useRef, useState } from 'react'
import { useModalContext } from '../../../../context/ModalContext'
import { useCustomerContext } from '../../../../context/CustomerContext'
import { useRouter } from 'next/router'

import Diaper from '../../../../svgs/diaper.svg'
import ShoppingCart from '../../../../svgs/shopping-cart.svg'
import Baby from '../../../../svgs/baby.svg'
import Waves from '../../../../svgs/waves.svg'


const LoginAccountForm = ({ redirect }) => {

  const router = useRouter()
  const modalContext = useModalContext()
  const customerContext = useCustomerContext()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }

      const response = await customerContext.login(formData)
      setIsLoading(false)

      if (response.errors?.length) {
          console.log(response)
          setErrorMessage(response.errors[0].message)
      } else {
          modalContext.setIsOpen(false)
          router.push(redirect)
      }
  }

  return (
    <div className="account-form">
        <div className="account-form__header">Log in to my<br/> Healthybaby account</div>
        <div className="account-form__icons">
          <div className="account-form__icon">
            <div className="account-form__icon--wrapper"><Diaper /></div>
                <span>Manage <br/> Orders</span>
            </div>
            <div className="account-form__icon">
                <div className="account-form__icon--wrapper"><Baby /></div>
                <span>Tailored <br/> Experience</span>
            </div>
            <div className="account-form__icon">
                <div className="account-form__icon--wrapper"><ShoppingCart /></div>
                <span>Easy<br/> Checkout</span>
            </div>
            <div className="account-form__icon">
                <div className="account-form__icon--wrapper"><Waves /></div>
                <span>Exclusive <br/> Content</span>
            </div>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          {errorMessage &&
              <p className="account-form__error">{errorMessage}</p>
          }
          <div className="account-form__group">
            <input type="email" className="input" placeholder="email address" ref={emailRef} />
          </div>
          <div className="account-form__group">
            <input type="password" className="input" placeholder="password" ref={passwordRef} />
          </div>
            <button className="account-form__submit" type="submit" disabled={isLoading}>Login</button>
        </form>
        <div className="account-form__links">
            <button className="account-form__link" onClick={() => modalContext.setModalType('forgot_password')}>
                Forgot Password
            </button>
            <button className="account-form__link" onClick={() => modalContext.setModalType('create')}>
                Create An Account
            </button>
        </div>
    </div>
  )
}

export default LoginAccountForm