import React from 'react'
// import ProductDetailTabs from '../ProductDetailTabs'
// import ContentTimeline from '../ContentTimeline'
// import NutritionChart from '../NutritionChart'
// import Experts from '../Experts'
// import ValueProps from '../ValueProps'
import ProductValueProps from '../../Product/ProductValueProps'

const ProductSections =  ({ content }) => {
    // console.log("product sections", content)
    return (
        <>
            {content.fields?.sections ? (
                content.fields.sections.map((section, index) => {
                    const type = section.type

                    console.log(section)

                    switch (type) {
                        case 'productDetailTabs':
                        return <ProductDetailTabs content={section} key={index} />
                        case 'contentTimeline':
                            return <ContentTimeline content={section} key={index} />
                        case 'nutritionChart':
                            return <NutritionChart content={section} key={index} />
                        case 'experts':
                            return <Experts content={section} key={index} />
                        case 'productValueProps':
                            return <ProductValueProps content={section} key={index} />
                        default:
                        return null
                    }
                })
            ) : ""} 
        </>
    )
}

export default ProductSections
