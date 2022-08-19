import React from 'react'

import HeroBanner from '../HeroBanner'
import ContentBanner from '../ContentBanner'
import CollectionCards from '../CollectionCards'
import DiaperFinder from '../DiaperFinder'
import ShopByCategory from '../ShopByCategory'
import BestSellers from '../BestSellers'
import ContentPreview from '../ContentPreview'
import StoriesSlider from '../StoriesSlider'
import About from '../About'
import WowAndHow from '../WowAndHow'

const ContentSections = ({ sections }) => {
    return (
        <>
            {sections.map((section, index) => {
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
                    case 'bestSellers':
                            return <BestSellers content={section} key={index} />
                    case 'storiesSlider':
                        return <StoriesSlider content={section} key={index} />
                    case 'contentPreview':
                        return <ContentPreview content={section} key={index} />
                    case 'wowAndHow':
                        return <WowAndHow content={section} key={index} />
                    case 'about':
                        return <About content={section} key={index} />
                    default:
                    return null
                }
            })}
        </>
    )
}

export default ContentSections
