import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

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
