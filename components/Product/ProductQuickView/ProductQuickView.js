import React from 'react'
import Script from 'next/script'

import ProductGallery from '../ProductGallery'
import ProductInfo from '../ProductInfo'

const ProductQuickView = ({content}) => {

    const { product, page } = {...content}

    return (
        <>
            <div className="product-quickview">
                <ProductGallery product={product} page={page} quickView={true} />
                <ProductInfo product={product} page={page} />
            </div>

        </>
    )
}

export default ProductQuickView
