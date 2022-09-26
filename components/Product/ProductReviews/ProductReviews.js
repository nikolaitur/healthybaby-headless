import React from 'react'
import Script from 'next/script';

const ProductReviews = ({ props }) => {
    return (
        <>
            <Script
                src="https://scripts.juniphq.com/v1/junip_shopify.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(``)
                }
            />
            <section className="product-reviews">
                <span class="junip-store-key" data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"></span>
                <span class="junip-product-review" data-product-id="4522469523505"></span>
            </section>
        </>
        
    )
}

export default ProductReviews
