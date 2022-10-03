import React from 'react';
import parse from 'html-react-parser'
import Image from 'next/image'

const ContactForm = ({content}) => {

  const { contactInformationItems } = {...content.fields}

  return (
    <div className="contact-form-section container">
      <form className="contact-form">Contact Form</form>
      {contactInformationItems?.length > 0 &&
        <div className="contact-information-group">
          <ul className="contact-information-items">
            {contactInformationItems.map(item => {
              const { text, icon } = {...item.fields}
              const imageWidth = icon?.fields?.file?.details?.image?.width || 40
              const imageHeight = icon?.fields?.file?.details?.image?.height || 40
              return <li className="contact-information-item" key={item.nacelleEntryId}>
                {icon && <div className="contact-information-item__image">
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