import React, { useState } from 'react';
import Link from 'next/link';

import CaretRight from '../../../svgs/caret-right.svg'

const ProductAboutAccordion = ({ title, links }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`accordion-item ${isActive ? "is-open" : ""}`}>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <span>EWG Verified</span>
        <span><CaretRight/></span>
      </div>
      {isActive && 
        <div className={`accordion-content ${isActive ? "is-open" : ""}`}>
            <p>The highest standard of safety & radical transparency available.  Healthybaby is the first and only EWG Verified diaper on the market today.</p>
            <p>900+ Independent lab tests</p>
            <p>3yrs Product testing & development</p>
            <p>4,400+ Ingredients banned</p>
        </div>
      }
    </div>
  );
};

export default ProductAboutAccordion;