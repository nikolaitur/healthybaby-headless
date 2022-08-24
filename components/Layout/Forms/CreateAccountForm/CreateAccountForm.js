import { useRef, useState, useEffect } from 'react'
import { useModalContext } from '../../../../context/ModalContext'
import { useCustomerContext } from '../../../../context/CustomerContext'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

import Diaper from '../../../../svgs/diaper.svg'
import ShoppingCart from '../../../../svgs/shopping-cart.svg'
import Baby from '../../../../svgs/baby.svg'
import Waves from '../../../../svgs/waves.svg'
import Plus from '../../../../svgs/plus-icon.svg'

const CreateAccountForm = () => {

    const modalContext = useModalContext()
    const customerContext = useCustomerContext()
    const firstNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const babyName1Ref = useRef()
    const babyName2Ref = useRef()
    const babyName3Ref = useRef()
    const babyBirthday1Ref = useRef()
    const babyBirthday2Ref = useRef()
    const babyBirthday3Ref = useRef()
    const emailMarketingConsentRef = useRef()

    const [babyBirthday1, setbabyBirthday1] = useState(false);
    const [babyBirthday2, setbabyBirthday2] = useState(false);
    const [babyBirthday3, setbabyBirthday3] = useState(false);
    
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const[extraBaby, setExtraBaby] = useState(0)

    const handleChange = () => {
        setChecked(!checked);
    };

    useEffect(() => {}, [extraBaby])

    const addBaby = () => {
        if(extraBaby !== 2) {
            setExtraBaby(extraBaby + 1)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            firstName: firstNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            babyName1: babyName1Ref.current.value,
            babyBirthday1: babyBirthday1,
            babyName2: babyName2Ref.current.value,
            babyBirthday2: babyBirthday2,
            babyName3: babyName3Ref.current.value,
            babyBirthday3: babyBirthday3,
            emailMarketingConsent: checked
        }

        console.log(formData)

        // const response = await customerContext.register(formData)

        // if (response.errors?.length) {
        //     console.log(response)
        //     // setError(response.errors[0].field[1])
        //     setErrorMessage(response.errors[0].message)
        // } else {
        //     const response = await customerContext.login({
        //         email: emailRef.current.value,
        //         password: passwordRef.current.value,
        //     })

        //     if (response) {
        //         firstNameRef.current.value = ""
        //         emailRef.current.value = ""
        //         passwordRef.current.value = ""
        //         babyName1Ref.current.value = ""
        //         babyBirthday1Ref.current.value = ""
        //         babyName2Ref.current.value = ""
        //         babyBirthday2Ref.current.value = ""
        //         babyName3Ref.current.value = ""
        //         babyBirthday3Ref.current.value = ""
        //         setChecked(!checked)
        //         modalContext.setIsOpen(false)
        //     }
        // }
    }


    return (
        <div className="account-form">
            <div className="account-form__header">Create your <br/>Healthybaby account</div>
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
                    <p className={classes['account-form__error']}>{errorMessage}</p>
                }
                <div className="account-form__group">
                    <input type="text" className="input" placeholder="Your first name" ref={firstNameRef} />
                </div>
                <div className="account-form__group">
                    <input type="email" className={error == "email" ? "error" : ""} placeholder="email" ref={emailRef} />
                </div>
                <div className="account-form__group">
                    <input type="password" className={error == "password" ? "error" : ""} placeholder="password" ref={passwordRef} />
                </div>
                <div className="account-form__group">
                    <input type="text" className="input" placeholder="Your baby's first name (optional)" ref={babyName1Ref} />
                </div>
                <div className="account-form__group">
                    {/* <input type="text" className="input" placeholder="Baby’s birth / due date  (optional)" ref={babyBirthday1Ref} /> */}
                    <DatePicker closeOnScroll={true}  onChange={(date) => setbabyBirthday1(date)} placeholderText="Baby’s birth / due date  (optional)" />
                </div>
                <div className={`extra-baby ${extraBaby >= 1 ? "show" : ""}`}>
                    <div className="account-form__group">
                        <input type="text" className="input" placeholder="Your baby's first name (optional)" ref={babyName2Ref} />
                    </div>
                    <div className="account-form__group">
                        {/* <input type="text" className="input" placeholder="Baby’s birth / due date  (optional)" ref={babyBirthday2Ref} /> */}
                        <DatePicker closeOnScroll={true} onChange={(date) => setbabyBirthday2(date)} placeholderText="Baby’s birth / due date  (optional)" />
                    </div>
                </div>
                <div className={`extra-baby ${extraBaby >= 2 ? "show" : ""}`}>
                    <div className="account-form__group">
                        <input type="text" className="input" placeholder="Your baby's first name (optional)" ref={babyName3Ref} />
                    </div>
                    <div className="account-form__group">
                        {/* <input type="text" className="input" placeholder="Baby’s birth / due date  (optional)" ref={babyBirthday3Ref} /> */}
                        <DatePicker closeOnScroll={true} onChange={(date) => setbabyBirthday3(date)} placeholderText="Baby’s birth / due date  (optional)" />
                    </div>
                </div>
                <div className={`account-form__add ${extraBaby >= 2 ? "hide" : ""}`} onClick={() => addBaby()}>
                    <span>
                        <Plus/>
                    </span>
                    <span>Add Another Baby</span>
                </div>
                <button className="account-form__submit" type="submit">Create Account</button>
                <div className="account-form__group">
                    <label>
                        <input type="checkbox" checked={checked} onChange={handleChange} ref={emailMarketingConsentRef}/>
                        Yes Please!  I’d like expert insights, developmental activities, community events & personalized support delivered to my inbox weekly 
                    </label>
                </div>
            </form>
            <div className="account-form__links">
                <button className="account-form__link" onClick={() => modalContext.setModalType('login')}>
                    Log In
                </button>
            </div>
        </div>
    )
}

export default CreateAccountForm;