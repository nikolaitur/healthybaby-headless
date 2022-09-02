import React, { useState } from 'react'
import { useRouter } from 'next/router'
import CollectionCallout from '../../Sections/CollectionCallout'
import CollectionProductCard from '../../Cards/CollectionProductCard'
import VitaminFinder from '../../Cards/VitaminFinder'
import DiaperFinderCard from '../../Cards/DiaperFinderCard'

const CollectionGrid = ({ content }) => {
    const sectionItems = content.fields.sections
    const {header, subheader } = content.fields

    const router = useRouter()

    return (
        <section className="collection-grid" data-background-color={content.fields?.backgroundColor ? content.fields.backgroundColor : ""}>
            <div className="collection-grid__container container">
                <div className={`collection-grid__content ${router.pathname !== `/shop-all` ? "hide" : ""}`}>
                    <h5 className={`collection-grid__header`}>{ header }</h5>
                    <p className="collection-grid__subheader large">{ subheader }</p>
                </div>
                <div className="collection-grid__wrapper">
                    {sectionItems.map((item, index) => {
                        let type = item.type;

                        switch (type) {
                            case 'collectionProductCard':
                                return <CollectionProductCard content={item} key={index} />
                            case 'collectionCallout':
                                return <CollectionCallout content={item} key={index} />
                            case 'diaperCalculator':
                                return <DiaperFinderCard content={item} key={index} />
                            case 'vitaminFinder':
                                return <VitaminFinder content={item} key={index} />
                            default:
                            return null
                        }
                    })}
                </div>
            </div>
        </section>
    )
}

export default CollectionGrid
