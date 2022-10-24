import { useRef, useState, useEffect } from 'react'
import { useModalContext } from '../../../../context/ModalContext'
import { useCustomerContext } from '../../../../context/CustomerContext'
import DatePicker from 'react-datepicker'
import { useRouter } from 'next/router'
import moment from 'moment'
import { dataLayerSignup } from '@/utils/dataLayer'

import 'react-datepicker/dist/react-datepicker.css'

import Diaper from '../../../../svgs/diaper.svg'
import ShoppingCart from '../../../../svgs/shopping-cart.svg'
import Baby from '../../../../svgs/baby.svg'
import Waves from '../../../../svgs/waves.svg'
import Plus from '../../../../svgs/plus-icon.svg'

const CreateAccountForm = () => {
  const modalContext = useModalContext()
  const customerContext = useCustomerContext()
  const router = useRouter()
  const firstNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const babyName1Ref = useRef()
  const babyName2Ref = useRef()
  const babyName3Ref = useRef()
  const emailMarketingConsentRef = useRef()

  const [babyBirthday1, setbabyBirthday1] = useState(null)
  const [babyBirthday2, setbabyBirthday2] = useState(null)
  const [babyBirthday3, setbabyBirthday3] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const [extraBaby, setExtraBaby] = useState(0)

  const handleChange = () => {
    setChecked(!checked)
  }

  useEffect(() => {}, [extraBaby])

  const addBaby = () => {
    if (extraBaby !== 2) {
      setExtraBaby(extraBaby + 1)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    dataLayerSignup({ url: router.pathname })
    const formData = {
      firstName: firstNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      emailMarketingConsent: checked,
    }

    let babyData = [
      {
        name: babyName1Ref.current.value,
        birthday: babyBirthday1,
      },
      {
        name: babyName2Ref.current.value,
        birthday: babyBirthday2,
      },
      {
        name: babyName3Ref.current.value,
        birthday: babyBirthday3,
      },
    ]

    babyData = babyData.filter((baby) => baby.name)

    const response = await customerContext.register(formData)

    if (response.errors?.length) {
      // setError(response.errors[0].field[1])
      setErrorMessage(response.errors[0].message)
    } else {
      const response = await customerContext.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })

      if (response) {
        if (babyData.length) {
          const metafields = [
            {
              ownerId: response.data.customer.id,
              namespace: 'baby',
              key: 'birthday',
              type: 'json',
              value: JSON.stringify([...babyData.map((baby) => baby.birthday)]),
            },
            {
              ownerId: response.data.customer.id,
              namespace: 'baby',
              key: 'name',
              type: 'json',
              value: JSON.stringify([...babyData.map((baby) => baby.name)]),
            },
          ]
          await customerContext.createBabyMetafields({ metafields })
        }
        setIsLoading(false)
        modalContext.setIsOpen(false)
        router.push('/account')
      }
    }
  }

  return (
    <div className="account-form">
      <div className="account-form__header">
        Create your <br />
        Healthybaby account
      </div>
      <div className="account-form__icons">
        <div className="account-form__icon">
          <div className="account-form__icon--wrapper">
            <Diaper />
          </div>
          <span>
            Manage <br /> Orders
          </span>
        </div>
        <div className="account-form__icon">
          <div className="account-form__icon--wrapper">
            <Baby />
          </div>
          <span>
            Tailored <br /> Experience
          </span>
        </div>
        <div className="account-form__icon">
          <div className="account-form__icon--wrapper">
            <ShoppingCart />
          </div>
          <span>
            Easy
            <br /> Checkout
          </span>
        </div>
        <div className="account-form__icon">
          <div className="account-form__icon--wrapper">
            <Waves />
          </div>
          <span>
            Exclusive <br /> Content
          </span>
        </div>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        {errorMessage && <p className="account-form__error">{errorMessage}</p>}
        <div className="account-form__group">
          <input
            type="text"
            className="input"
            placeholder="Your first name"
            ref={firstNameRef}
          />
        </div>
        <div className="account-form__group">
          <input
            type="email"
            className={error == 'email' ? 'error' : ''}
            placeholder="email"
            ref={emailRef}
          />
        </div>
        <div className="account-form__group">
          <input
            type="password"
            className={error == 'password' ? 'error' : ''}
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <div className="account-form__group">
          <input
            type="text"
            className="input"
            placeholder="Your baby's first name (optional)"
            ref={babyName1Ref}
          />
        </div>
        <div className="account-form__group">
          <DatePicker
            dateFormat="MM/dd/yy"
            closeOnScroll={true}
            onChange={(date) =>
              setbabyBirthday1(moment(date).format('MM/DD/YYYY'))
            }
            placeholderText="Baby’s birth / due date  (optional)"
            value={babyBirthday1}
          />
        </div>
        <div className={`extra-baby ${extraBaby >= 1 ? 'show' : ''}`}>
          <div className="account-form__group">
            <input
              type="text"
              className="input"
              placeholder="Your baby's first name (optional)"
              ref={babyName2Ref}
            />
          </div>
          <div className="account-form__group">
            <DatePicker
              dateFormat="MM/dd/yy"
              closeOnScroll={true}
              onChange={(date) =>
                setbabyBirthday2(moment(date).format('MM/DD/YYYY'))
              }
              placeholderText="Baby’s birth / due date  (optional)"
              value={babyBirthday2}
            />
          </div>
        </div>
        <div className={`extra-baby ${extraBaby >= 2 ? 'show' : ''}`}>
          <div className="account-form__group">
            <input
              type="text"
              className="input"
              placeholder="Your baby's first name (optional)"
              ref={babyName3Ref}
            />
          </div>
          <div className="account-form__group">
            <DatePicker
              dateFormat="MM/dd/yy"
              closeOnScroll={true}
              onChange={(date) =>
                setbabyBirthday3(moment(date).format('MM/DD/YYYY'))
              }
              placeholderText="Baby’s birth / due date  (optional)"
              value={babyBirthday3}
            />
          </div>
        </div>
        <div
          className={`account-form__add ${extraBaby >= 2 ? 'hide' : ''}`}
          onClick={() => addBaby()}
        >
          <span>
            <Plus />
          </span>
          <span>Add Another Baby</span>
        </div>
        <button
          className="account-form__submit"
          type="submit"
          disabled={isLoading}
        >
          Create Account
        </button>
        <div className="account-form__group">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              ref={emailMarketingConsentRef}
            />
            Yes Please! I’d like expert insights, developmental activities,
            community events & personalized support delivered to my inbox weekly
          </label>
        </div>
      </form>
      <div className="account-form__links">
        <button
          className="account-form__link"
          onClick={() => modalContext.setModalType('login')}
        >
          Log In
        </button>
      </div>
    </div>
  )
}

export default CreateAccountForm
