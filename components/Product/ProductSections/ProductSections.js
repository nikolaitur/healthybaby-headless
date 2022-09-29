import React from 'react'
import ProductValueProps from '../../Product/ProductValueProps'
import ProductIngredients from '../../Product/ProductIngredients'
import ProductTechnologyCallout from '../../Product/ProductTechnologyCallout'
import ProductAbout from '../../Product/ProductAbout'
import ProductFiftyFifty from '../../Product/ProductFiftyFifty'
import ProductDetail from '../../Product/ProductDetail'
import ProductCrossSells from '../../Product/ProdcutCrossSells'
// import ProductReviews from '../../Product/ProdcutReviews'

const ProductSections =  ({ content }) => {
    
    // console.log("product sections", content)

    return (
        <div className="product-main__sections">
            {content.fields?.sections ? (
                content.fields.sections.map((section, index) => {
                    const type = section.type

                    // console.log(section)

                    switch (type) {
                        case 'productValueProps':
                            return <ProductValueProps content={section} key={index} />;
                        case 'productIngredients':
                            return <ProductIngredients content={section} key={index} />;
                        case 'productFiftyFifty':
                            return <ProductFiftyFifty content={section} key={index} />;
                        case 'productDetail':
                            return <ProductDetail content={section} key={index} />;
                        case 'productAbout':
                            return <ProductAbout content={section} key={index} />;
                        case 'productTechnology':
                            return <ProductTechnologyCallout content={section} key={index} />;
                        default:
                        return null
                    }
                })
            ) : ""} 
            <ProductCrossSells />
            {/* <ProductReviews /> */}
        </div>
    )
}

export default ProductSections
