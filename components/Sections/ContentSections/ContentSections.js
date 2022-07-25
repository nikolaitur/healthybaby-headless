import React from 'react'

import HeroBanner from '../HeroBanner'
import ContentBanner from '../ContentBanner'
import CollectionCards from '../CollectionCards'
import DiaperFinder from '../DiaperFinder'
import ShopByCategory from '../ShopByCategory'

const ContentSections = ({ sections }) => {
    return sections.map((section, index) => {
        const type = section.type

        switch (type) {
            case 'heroBanner':
            return <HeroBanner content={section} key={index} />
            case 'contentBanner':
            return <ContentBanner content={section} key={index} />
            case 'categoryCards':
            return <CollectionCards content={section} key={index} />
            case 'diaperFinder':
            return <DiaperFinder content={section} key={index} />
            case 'shopByCategory':
            return <ShopByCategory content={section} key={index} />
            default:
            return null
        }
    })
}

export default ContentSections
