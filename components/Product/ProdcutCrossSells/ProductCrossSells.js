import React from 'react'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import CollectionProductCard from '../../Cards/CollectionProductCard'

const ProductCrossSells = ({ content }) => {

    return (
        <div className="product-cross-sells">
            <div className="product-cross-sells__container container">
                {content.fields?.subheader ? 
                        <h6 className="product-cross-sells__subheader">{ content.fields.subheader }</h6>
                : ""}
                {content.fields?.subheader ? 
                    <div className="product-cross-sells__header" dangerouslySetInnerHTML={{__html:  documentToHtmlString(content.fields.header) }}></div>
                : ""}
                {content.fields?.sections ? (
                    <div className="product-cross-sells__items">
                         {content.fields.sections.map((item, index) => {
                            return <CollectionProductCard content={item} key={index}/>
                         })}
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProductCrossSells