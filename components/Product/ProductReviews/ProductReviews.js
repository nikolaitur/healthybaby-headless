import React from 'react'
import Script from 'next/script';

const ProductReviews = ( props ) => {
    const { product } = props

    return (
        <>
            {product ? (
                <>
                    <Script
                        src="https://scripts.juniphq.com/v1/junip_shopify.js"
                        strategy="lazyOnload"
                    />
                    <div className="product-reviews">
                        <span className="junip-store-key" data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"></span>
                        <span className="junip-product-review" data-product-id="4522469523505"></span>
                        {/* <span class="junip-product-review" data-product-id={`${product.sourceEntryId.split("gid://shopify/Product/").pop()}`}></span> */}
                    </div>
                </>
            ) : ""}
        </>
    )
}

export default ProductReviews
