import { useState, useRef, createRef } from 'react'
import parse from 'html-react-parser'
import Image from 'next/image'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'
import { animateScroll as scroll } from 'react-scroll'

const ContactForm = ({content}) => {

  const { contactInformationItems } = {...content.fields}
  const [requestType, setRequestType] = useState(null)
  const [showRequestTypeErrorMsg, setShowRequestTypeErrorMsg] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const refs = ['name', 'email', 'phone_number', 'order_number', 'message']
  const contactFormRef = useRef()

  const formRef = useRef(refs.reduce((carry, ref) => {
    return {
      ...carry,
      [ref]: createRef()
    }
  }, {}))

  const onSubmit = async (e) => {
    e.preventDefault()

    if (requestType === null) {
      setShowRequestTypeErrorMsg(true)
      return
    } else {}

    const data = {}

    for (const keyName of Object.keys(formRef.current)) {
      const value = formRef.current[keyName].current.value
      data[keyName] = value
    }

    data['subject'] = requestType.value

    const response = await fetch('/api/zendesk/create-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(data)
    }).then(res => res.json())

    if (response && response.message === 'success') {
      setFormSubmitted(true)
      setShowErrorMessage(false)
      const value = contactFormRef.current.getBoundingClientRect().top + window.scrollY - 150
      scroll.scrollTo(value, {
        duration: 300,
      })

    } else {
      setShowErrorMessage(true)
    }
  }

  const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <div className="dropdown-selector__arrow-open"><IconCaretTop /></div>
        </components.DropdownIndicator>
      )
    )
  }

  const colourStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? '#00B188' : '#fff',
      color: state.isSelected || state.isFocused ? '#fff' : '#3D3331',
    }),
  }


  const options = [
    {
      value: 'Products',
      label: 'Products'
    },
    {
      value: 'Order',
      label: 'Order'
    },
    {
      value: 'Something Else',
      label: 'Something Else'
    }
  ]

  return (
    <div ref={contactFormRef} className="contact-form-section container">
      {formSubmitted ? (
        <div className="contact-form">
          <h4 className="text-align--center">Thank you!<br />{`We'll get back to you as soon as possible`}.</h4>
        </div>
      ):(
        <form className="contact-form" onSubmit={(e) => onSubmit(e)}>
          <div className="input-group--wrapper">
            <div className="input-group">
              <input className="input" type="text" placeholder="Name *" ref={formRef.current.name} required />
              <label className="label">Name</label>
            </div>
            <div className="input-group">
              <input className="input" type="email" placeholder="Email *" ref={formRef.current.email} required />
              <label className="label">Email</label>
            </div>
          </div>
          <div className="input-group--wrapper">
            <div className="input-group">
              <input
                className="input"
                type="text"
                placeholder="Phone Number (optional)"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                ref={formRef.current.phone_number}
              />
              <label className="label">Phone Number</label>
            </div>
            <div className="input-group">
              <input
                className="input"
                type="text"
                placeholder="Order Number (optional)"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                ref={formRef.current.order_number} />
              <label className="label">Order Number</label>
            </div>
          </div>

          <div className="input-group">
            <Select
              onChange={(e) => {
                setShowRequestTypeErrorMsg(false)
                setRequestType(e)
              }}
              className={`select-dropdown-selector`}
              classNamePrefix="react-select"
              options={options}
              value={requestType}
              components={{ DropdownIndicator }}
              placeholder={'Request Type *'}
              styles={colourStyles}
            />
            {showRequestTypeErrorMsg && <span className="contact-form__error-msg">Please select a request type</span>}
          </div>


          <div className="input-group">
            <textarea className="textarea" type="text" placeholder="Message... *" ref={formRef.current.message} required />
          </div>

          <div className="contact-form__submit">
            <button className="btn secondary">Send Message</button>
          </div>

          {showErrorMessage &&
            <p className="contact-form__error-msg">Sorry, an error has occurred. Please try again or email support@healthybaby.com for assistance</p>
          }
        </form>
      )}

      {contactInformationItems?.length > 0 &&
        <div className="contact-information-group">
          <ul className="contact-information-items">
            {contactInformationItems.map(item => {
              const { text, icon } = {...item.fields}
              const imageWidth = icon?.fields?.file?.details?.image?.width || 40
              const imageHeight = icon?.fields?.file?.details?.image?.height || 40
              return <li className="contact-information-item" key={item.nacelleEntryId}>
                {icon?.fields?.file?.url && <div className="contact-information-item__image">
                  <Image src={`https:${icon.fields.file.url}`} width={imageWidth} height={imageHeight} alt={icon.fields.title} />
                </div>}
                {text && <div className="contact-information-item__text">
                  {parse(text)}
                </div>}
              </li>
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default ContactForm