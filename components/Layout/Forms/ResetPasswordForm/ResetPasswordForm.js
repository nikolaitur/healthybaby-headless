import { useRef, useState } from 'react'
import { useCustomerContext } from '../../../../context/CustomerContext'

const ResetPasswordForm = ({ customerId, resetToken}) => {
  const customerContext = useCustomerContext()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMessage('Passwords do not match')
      return
    }
    setIsLoading(true)
    const response = await customerContext.reset({
      password: passwordRef.current.value,
      resetToken,
      customerId
    })

    setIsLoading(false)

    if (response.errors?.length) {
      setErrorMessage(response.errors[0].message)
    } else {
      if (response) {
        passwordRef.current.value = ''
        confirmPasswordRef.current.value = ''
        setErrorMessage(false)
        setSuccessMessage(true)
      }
    }
  }

  return (
    <div className="account-form">
      <div className="account-form__header">Reset Password<br/></div>
      <p className="account-form__subheader">Enter a new account password.</p>
      <form onSubmit={(e) => onSubmit(e)}>
        {errorMessage &&
          <p className="account-form__error">{errorMessage}</p>
        }
        {successMessage &&
          <p className="account-form__success">{`You're all set! Please login to continue`}</p>
        }
        <div className="account-form__group">
          <input type="password" className="input" placeholder="new password" ref={passwordRef} />
        </div>
        <div className="account-form__group">
          <input type="password" className="input" placeholder="confirm new password" ref={confirmPasswordRef} />
        </div>
        <button className="account-form__submit" type="submit" disabled={isLoading}>Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPasswordForm