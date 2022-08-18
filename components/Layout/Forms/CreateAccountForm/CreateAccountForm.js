import { useRef, useReducer } from 'react'
import { useModalContext } from '../../../../context/ModalContext'
import { useCustomerContext } from '../../../../context/CustomerContext'
// import { accountFormReducer, initialState } from '@/utils/account'

const CreateAccountForm = () => {

    const modalContext = useModalContext()
    const customerContext = useCustomerContext()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
//   const [state, dispatch] = useReducer(accountFormReducer, initialState)
//   const { showSuccessMessage, showErrorMessage, errorMessage, isLoading} = state

    console.log(customerContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    // dispatch({ type: 'loading' })
    const response = await customerContext.register({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })

    if (response.errors?.length) {
      console.log(response)
      // dispatch({ type: 'error', payload: response.errors[0].message })
    } else {
      const response = await customerContext.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })

      if (response) {
        firstNameRef.current.value = ''
        lastNameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''
        modalContext.setIsOpen(false)
        // dispatch({ type: 'success' })
        // TODO: redirect to account page
      }
    }
  }


  return (
    <div className="login-form">
        <div className="login-form__header">Create your <br/>Healthybaby account</div>
        <div className="login-form__icons">

        </div>
        <form onSubmit={(e) => onSubmit(e)}>
            {/* {showErrorMessage &&
            <p className={classes['account-form__error']}>{errorMessage}</p>
            } */}
            <div className="input-group">
            <input type="text" className="input" placeholder="first name" ref={firstNameRef} />
            </div>
            <div className="input-group">
            <input type="text" className="input" placeholder="last name" ref={lastNameRef} />
            </div>
            <div className="input-group">
            <input type="email" className="input" placeholder="email" ref={emailRef} />
            </div>
            <div className="input-group">
            <input type="password" className="input" placeholder="password" ref={passwordRef} />
            </div>
            <button className="">Create Account</button>
        </form>
        <p>Already a member?&nbsp;
            <button
            onClick={() => modalContext.setModalType('login')}
            className="btn-link-underline">
                Log In
            </button>
        </p>
    </div>
  )
}

export default CreateAccountForm;