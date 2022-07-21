import React, { useState } from 'react';
import Link from 'next/link';

import CaretRight from '../../../svgs/caret-right.svg'

const FooterAccordion = ({ title, links }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`accordion-item ${isActive ? "is-open" : ""}`}>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <span>{title}</span>
        <span><CaretRight/></span>
      </div>
      {isActive && 
        <ul className={`accordion-content ${isActive ? "is-open" : ""}`}>
            {links.map((link, index) => (
                <li className="accordion-link" key={index}>
                     <Link href={link.fields.url}>
                        {link.fields.title}
                     </Link>
                </li>
            ))}
        </ul>
      }
    </div>
  );
};

export default FooterAccordion;