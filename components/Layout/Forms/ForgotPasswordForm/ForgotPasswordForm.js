import { useRef, useState } from 'react'
import { useModalContext } from '../../../../context/ModalContext'
import { useCustomerContext } from '../../../../context/CustomerContext'

const ForgotPasswordForm = () => {

  const modalContext = useModalContext()
  const customerContext = useCustomerContext()
  const emailRef = useRef()

  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await customerContext.recover({
      email: emailRef.current.value,
    })
    setIsLoading(false)
    if (response.errors?.length) {
      console.log(response)
      setErrorMessage(response.errors[0].message)
    } else {
      if (response) {
        console.log("response:", response)
        setErrorMessage(false)
        setSuccessMessage(true)
      }
    }
  }

  return (
    <div className="account-form">
        <div className="account-form__header">Forgot Your Password?</div>
        {!successMessage && <p className="account-form__subheader">{`Enter the email address associated with your account and we'll email you a link to reset your password.`}</p>}
        <form onSubmit={(e) => onSubmit(e)}>
          {errorMessage &&
              <p className="account-form__error">{errorMessage}</p>
          }
          {successMessage &&
            <p className="account-form__success">Email sent! Please check your inbox.</p>
          }
          {!successMessage &&
            <>
              <div className="account-form__group">
                <input type="email" className="input" placeholder="email address" ref={emailRef} />
              </div>
              <button className="account-form__submit" type="submit" disabled={isLoading}>Submit</button>
            </>
          }
        </form>
        <div className="account-form__links">
            <button className="account-form__link" onClick={() => modalContext.setModalType('login')}>
                {`Have An account?`}
            </button>
            <button className="account-form__link" onClick={() => modalContext.setModalType('create')}>
                {`Sign Up`}
            </button>
        </div>
    </div>
  )
}

export default ForgotPasswordForm