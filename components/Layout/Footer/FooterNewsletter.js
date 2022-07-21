import React, { useState } from 'react';

import PaperPlane from '../../../svgs/paper-plane-tilt.svg'

const FooterNewsletter = ({ content}) => {
  const handleSubmit = () => {

  }

  return (
    <div className="footer__newsletter">
        <div className="footer__content">
            <div className="footer__eyebrow">{content.fields.subtitle}</div>
            <div className="footer__header">{content.fields.header}</div>
        </div>
        <form className="footer__form">
            <input type="text" placeholder={content.fields.inputPlaceholder} />
            <div className="footer__submit" onClick={() => handleSubmit()}>
                <PaperPlane />
            </div>
        </form>
    </div>

  );
};

export default FooterNewsletter;