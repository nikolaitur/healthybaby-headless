import React, { useState } from 'react';
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import CaretRight from '../../../svgs/caret-right.svg'

const ProductAboutAccordion = ({ item }) => {
    const [isActive, setIsActive] = useState(false);

    console.log(item)

    return (
        <div className={`accordion-item ${isActive ? "is-open" : ""}`}>
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
            {item.fields?.image ? (
                <>
                    <div className="accordion-image">
                        <Image
                            className="featured"
                            src={`https:${item.fields.image.fields.file.url}`}
                            alt={item.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height="56"
                            width="56"
                        />
                    </div>
                </>
            ) : ""}
            {item.fields?.header ? (
                <span dangerouslySetInnerHTML={{__html:  documentToHtmlString(item.fields.header) }}></span>
            ) : ""}
            <span className="accordion-arrow"><CaretRight/></span>
        </div>
        {isActive && 
            item.fields?.copy ? 
                <div className={`accordion-content ${isActive ? "is-open" : ""}`} dangerouslySetInnerHTML={{__html:  documentToHtmlString(item.fields.copy) }}></div>
            : ""
        }
        </div>
    );
};

export default ProductAboutAccordion;