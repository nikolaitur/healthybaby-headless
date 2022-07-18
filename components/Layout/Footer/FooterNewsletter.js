import React, { useState } from 'react';

import PaperPlane from '../../../svgs/paper-plane-tilt.svg'

const FooterNewsletter = ({ title, links }) => {
  const handleSubmit = () => {

  }

  return (
    <div className="footer__newsletter">
        <div className="footer__content">
            <div className="footer__eyebrow">OUR WEEKLY NEWSLETTER</div>
            <div className="footer__header">Get expert insights, developmental activities, community events & personalized support</div>
        </div>
        <form className="footer__form">
            <input type="text" placeholder="your email..." />
            <div className="footer__submit" onClick={() => handleSubmit()}>
                <PaperPlane />
            </div>
        </form>
    </div>

  );
};

export default FooterNewsletter;