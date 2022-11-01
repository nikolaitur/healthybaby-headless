import React from 'react'
import ProductValueProps from '../../Product/ProductValueProps'
import ProductContentBanner from '../../Product/ProductContentBanner'
import ProductIngredients from '../../Product/ProductIngredients'
import ProductTechnologyCallout from '../../Product/ProductTechnologyCallout'
import ProductAbout from '../../Product/ProductAbout'
import ProductFiftyFifty from '../../Product/ProductFiftyFifty'
import ProductDetail from '../../Product/ProductDetail'
import ProductCrossSells from '../../Product/ProdcutCrossSells'
import FAQGroup from '../../Sections/FAQGroup'

// import ProductReviews from '../../Product/ProdcutReviews'

const ProductSections =  ({ content, product, productBadges }) => {
    console.log(content.fields.sections)
    return (
        <div className="product-main__sections">
            {content.fields?.sections ? (
                content.fields.sections.map((section, index) => {
                    const type = section.type

                    switch (type) {
                        case 'productValueProps':
                            return <ProductValueProps content={section} key={index} />;
                        case 'productContentBanner':
                            return <ProductContentBanner content={section} key={index} />;
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
                        case 'productCrossSells':
                            return <ProductCrossSells content={section} product={product} key={index} productBadges={productBadges} />;
                        case 'faqGroup':
                            return <FAQGroup content={section} key={index} classes={"container"} />
                        default:
                        return null
                    }
                })
            ) : ""}
        </div>
    )
}

export default ProductSections
