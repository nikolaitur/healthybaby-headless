import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const CollectionHeader = ({ content }) => {
    const router = useRouter()
    const { titleAlignmentDesktop, titleAlignmentMobile} = {...content.fields}


    // find more examples from https://lightrun.com/answers/contentful-rich-text-rendering-rich-text-in-react-native
    const contentfulToReactnative = {
        renderNode: {
        [INLINES.HYPERLINK]: (children) => {
            return <Link href={children?.data?.uri || ''}>
            <a className="link">{children.content[0].value}</a>
            </Link>
        },
        [BLOCKS.PARAGRAPH]: (node, children) => <p className="large">{children}</p>
        },
    }

    return (
        <section className="collection-header">
            <div className="collection-header__container container">
                <div className="collection-header__content">
                    {content?.title ?
                        <div className="collection-header__breadcrumbs">
                            <Link href="/">
                                <div className="collection-header__breadcrumb">
                                    <span>Home /{`\u00A0`}</span>
                                </div>
                            </Link>
                            <Link href={content.handle}>
                                <div className="collection-header__breadcrumb">
                                    <span> { content.title }</span>
                                </div>
                            </Link>
                        </div>
                    : "" }

                    {content?.title ?
                        <h1 className={`collection-header__title h2 ${titleAlignmentDesktop == "Left" ? "left-desktop" : "center-desktop"} ${titleAlignmentDesktop == "Left" ? "left-mobile" : "center-mobile"}`}>{ parse(content.title) }</h1>
                    : ""}

                    {content?.description ?
                        <div className="collection-header__description">{content.description}</div>
                    : ""}

                    {content.fields?.description ?
                        <div className="collection-header__description">{documentToReactComponents(content.fields.description, contentfulToReactnative)}</div>
                    : ""}

                    {content.fields?.menu ? (
                        <div className="collection-header__links">
                            {content.fields.menu.fields?.sections ? (
                                content.fields.menu.fields.sections.map((item, index) => {
                                    return (
                                        <Link href={`/${item.fields?.url ? item.fields.url : ""}`} key={index}>
                                            <div className={`collection-header__link ${router.pathname == `/${item.url}` ? "active" : ""}`}>
                                                {item.fields?.image ? (
                                                    <span className="image">
                                                        <Image
                                                            className="featured"
                                                            src={`https:${item.fields.image.fields.file.url}`}
                                                            alt={item.fields.image.fields.title}
                                                            layout="responsive"
                                                            objectFit="cover"
                                                            height="84"
                                                            width="84"
                                                        />
                                                    </span>
                                                ) : <span className="image"></span>}
                                                <span>{item.fields?.title ? item.fields.title : ""}</span>
                                            </div>
                                        </Link>
                                    )
                                })
                            ) : ""}
                        </div>
                    ) : ""}
                </div>
            </div>
        </section>
    )
}

export default CollectionHeader
