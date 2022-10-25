import React from 'react'
import Script from 'next/script';

const ProductReviews = ( props ) => {
    const { product } = props

    return (
        <>
            {product ? (
                <>
                    <div className="product-reviews">
                        <span className="junip-store-key" data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"></span>
                        <span className="junip-product-review" data-product-id={product.sourceEntryId.replace('gid://shopify/Product/', '')}></span>
                    </div>
                </>
            ) : ""}
        </>
    )
}

export default ProductReviews
