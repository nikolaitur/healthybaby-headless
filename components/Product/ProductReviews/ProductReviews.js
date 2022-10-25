import React from 'react'
import Script from 'next/script';

const ProductReviews = ( props ) => {
    const { product } = props

    return (
        <>
            {product ? (
                <>
                    <div className="product-reviews">
                        <span className="junip-product-review" data-product-id={product.sourceEntryId.replace('gid://shopify/Product/', '')}></span>
                    </div>
                </>
            ) : ""}
        </>
    )
}

export default ProductReviews
