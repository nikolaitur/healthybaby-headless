import React from 'react'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const SubscribeModal = ({content}) => {

    const { page } = {...content}

    console.log(content, "Subscribe")

    return (
        <>  
            <div className="subscribe-info-modal">
                {page.fields?.header ? (
                    <div className="subscribe-info-modal__header">{page.fields.header}</div>
                ) : ""}
                {page.fields?.description ? (
                    <div
                        className="subscribe-info-modal__description"
                        dangerouslySetInnerHTML={{
                            __html: documentToHtmlString(
                            page.fields.description
                            ),
                        }}
                    ></div>
                ) : ""} 
            </div>
        </>
    )
}

export default SubscribeModal
