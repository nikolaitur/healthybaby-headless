import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductFiftyFifty = ({ content }) => {

    // console.log(content)

    return (
        <div className="product-fifty-fifty">
            <div className={`product-fifty-fifty__container container ${content.fields?.flipped ? (content.fields.flipped == "True" ? "flipped" : "") : ""}`}>
                <div className="product-fifty-fifty__content">
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
                    <div className="product-fifty-fifty__image product-fifty-fifty__image--mobile">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/71vy1gTzW8vYaWYDCqeRXz/041cd5e9a5efbf80c7d1356686491beb/Mask_group__24_.png`}
                            alt=""
                            width="785"
                            height="750"
                        />
                    </div>
                </div>
                <div className="product-fifty-fifty__image  product-fifty-fifty__image--desktop">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/71vy1gTzW8vYaWYDCqeRXz/041cd5e9a5efbf80c7d1356686491beb/Mask_group__24_.png`}
                        alt=""
                        width="785"
                        height="750"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductFiftyFifty
