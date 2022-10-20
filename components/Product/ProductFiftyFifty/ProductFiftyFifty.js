import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductFiftyFifty = ({ content }) => {
    return (
        <div className="product-fifty-fifty">
            <div className={`product-fifty-fifty__container container ${content.fields?.flipped ? (content.fields.flipped == "True" ? "flipped" : "") : ""}`}>
                <div className="product-fifty-fifty__content">
                    {content.fields?.image ? (
                        <div className="product-fifty-fifty__image product-fifty-fifty__image--mobile">
                            <Image
                                src={`https:${content.fields.image.fields.file.url}`}
                                alt={content.fields.image.fields.title}
                                width="785"
                                height="750"
                            />
                        </div>
                    ) : ""}
                    
                    {content.fields?.subheader ? 
                        <h6 className="product-fifty-fifty__subheader">{ content.fields.subheader }</h6>
                    : ""}
                    {content.fields?.header ? 
                        <h3 className="product-fifty-fifty__header">{ content.fields.header }</h3>
                    : ""}
                    {content.fields?.copy ? 
                        <div className="product-fifty-fifty__copy large" dangerouslySetInnerHTML={{__html:  documentToHtmlString(content.fields.copy) }}></div>
                    : ""}
                    {content.fields?.ctaText && content.fields?.ctaUrl ? 
                        <Link href={content.fields.ctaUrl}>
                            <div className="product-fifty-fifty__link">
                                <span>{ content.fields.ctaText }</span>
                            </div>
                        </Link>
                : ""}
                </div>
                {content.fields?.image ? (
                    <div className="product-fifty-fifty__image  product-fifty-fifty__image--desktop">
                        <Image
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            width="785"
                            height="750"
                        />
                    </div>
                ) : ""}
                
            </div>
        </div>
    )
}

export default ProductFiftyFifty
