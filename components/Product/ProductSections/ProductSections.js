import React from 'react'
// import ProductDetailTabs from '../ProductDetailTabs'
// import ContentTimeline from '../ContentTimeline'
// import NutritionChart from '../NutritionChart'
// import Experts from '../Experts'
// import ValueProps from '../ValueProps'
import ProductValueProps from '../../Product/ProductValueProps'
import ProductIngredients from '../../Product/ProductIngredients'

const ProductSections =  ({ content }) => {
    // console.log("product sections", content)
    return (
        <>
            {content.fields?.sections ? (
                content.fields.sections.map((section, index) => {
                    const type = section.type

                    console.log(section)

                    switch (type) {
                        case 'productValueProps':
                            return <ProductValueProps content={section} key={index} />
                        case 'productIngredients':
                            return <ProductIngredients content={section} key={index} />;
                        default:
                        return null
                    }
                })
            ) : ""} 
        </>
    )
}

export default ProductSections
