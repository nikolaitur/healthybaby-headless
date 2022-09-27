import React from 'react'
import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'

import CollectionProductCard from '../../Cards/CollectionProductCard'

const ProductCrossSells = ({ content }) => {
    const [product, setProduct] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            await nacelleClient.content({
                nacelleEntryIds: ["aWQ6Ly9DT05URU5URlVML3VyZHJ6emFjNGlncC9tYXN0ZXIvQ09OVEVOVC82UmlReUFrY0pqdmR3OTZYMHNWR0xKL2VuLVVT"]
            }).then(response => {
                console.log(response[0])
                setProduct(response[0])
            });
        }

        getProduct()
    }, [])

    return (
        <div className="product-cross-sells">
            <div className="product-cross-sells__container container">
                <h6 className="product-cross-sells__subheader">YOU MAY ALSO LIKE</h6>
                <h3 className="product-cross-sells__header">Simplify daily routines with <i>fewer,<br/> better</i> things</h3>
                {product ? (
                    <div className="product-cross-sells__items">
                        <CollectionProductCard content={product} />
                        <CollectionProductCard content={product} />
                        <CollectionProductCard content={product} />
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProductCrossSells