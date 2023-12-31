import React from 'react'
import ProductDetailTabs from '../ProductDetailTabs'
import ContentTimeline from '../ContentTimeline'
import NutritionChart from '../NutritionChart'
import Experts from '../Experts'
import ValueProps from '../ValueProps'

const CollectionSections =  ({ content }) => {

    return (
        <>
            {content.fields?.collectionSections ? (
                content.fields.collectionSections.map((section, index) => {
                    const type = section.type

                    switch (type) {
                        case 'productDetailTabs':
                        return <ProductDetailTabs content={section} key={index} />
                        case 'contentTimeline':
                            return <ContentTimeline content={section} key={index} />
                        case 'nutritionChart':
                            return <NutritionChart content={section} key={index} />
                        case 'experts':
                            return <Experts content={section} key={index} />
                        case 'valueProps':
                            return <ValueProps content={section} key={index} />
                        default:
                        return null
                    }
                })
            ) : ""} 
        </>
    )
}

export default CollectionSections
