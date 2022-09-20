import React, { useState } from 'react'
import Link from 'next/link';

const CollectionCallout = ({ content }) => {
    return (
        <div className="collection-callout">
            <div className="collection-callout__container">
                <div className="collection-callout__content">
                    {content.fields?.subheader ? 
                        <p className="collection-callout__subheader">{ content.fields.subheader }</p>
                    : ""}
                    {content.fields?.header ? 
                        <h2 className="collection-callout__header">{ content.fields.header }</h2>
                    : ""}
                    {content.fields?.ctaText && content.fields?.ctaUrl ? 
                        <Link href={content.fields.ctaUrl}>
                            <div className="collection-callout__link">
                                <span>{ content.fields.ctaText }</span>
                            </div>
                        </Link>
                    : ""}
                </div>
            </div>
        </div>
    )
}

export default CollectionCallout 
