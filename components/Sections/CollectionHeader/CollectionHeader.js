import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const CollectionHeader = ({ content }) => {
    const router = useRouter()

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
                        <h1 className="collection-header__title h2">{ content.title }</h1>
                    : ""}

                    {content.fields?.description ?
                        <p className="collection-header__description">{ content.fields.description }</p>
                    : ""}

                    {content?.description ?
                        <p className="collection-header__description">{ content.description }</p>
                    : ""}

                    <div className="collection-header__links">
                        <Link href={"/shop-all"}>
                            <div className={`collection-header__link ${router.pathname == `/shop-all` ? "active" : ""}`}>
                                <span className="image"></span>
                                <span>Shop All</span>
                            </div>
                        </Link>
                        <Link href={"/collections/diapers-wipes"}>
                            <div className={`collection-header__link ${router.asPath == `/collections/diapers-wipes` ? "active" : ""}`}>
                                <span className="image"></span>
                                <span>Diapers</span>
                            </div>
                        </Link>
                        <Link href={"/collections/skin-care"}>
                            <div className={`collection-header__link ${router.asPath == `/collections/skin-care` ? "active" : ""}`}>
                                <span className="image"></span> 
                                <span>Skin Care</span>
                            </div>
                        </Link>
                        <Link href={`/collections/home-cleaning`}>
                            <div className={`collection-header__link ${router.asPath == `/collections/home-cleaning` ? "active" : ""}`}>
                                <span className="image"></span>
                                <span>Cleaning</span>
                            </div>
                        </Link>
                        <Link href={"/collections/prenatals"}>
                            <div className={`collection-header__link ${router.asPath == `/collections/prenatals` ? "active" : ""}`}>
                                <span className="image"></span>
                                <span>Prenatals</span>
                            </div>
                        </Link>
                        <Link href={"/collections/gifts"}>
                            <div className={`collection-header__link ${router.asPath == `/collections/gifts` ? "active" : ""}`}>
                                <span className="image"></span>
                                <span>Gifts</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CollectionHeader
