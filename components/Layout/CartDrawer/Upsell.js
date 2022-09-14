import React from 'react';
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';


import { nacelleClient } from 'services'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'

const Upsell = ({product, variantId }) => {
    // console.log(product, variantId)
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
    const [
        { cart },
        { addToCart },
    ] = useCart()

    let options = null
    if (product?.content?.options?.some((option) => option.values.length > 1)) {
      options = product?.content?.options
    }

    // console.log(product, product.content.title, selectedVariant)

    useEffect(() => {
        if(variantId) {
            let variant = product.variants.filter(variant => {
                return variant.content.sourceEntryId.split("gid://shopify/ProductVariant/").pop() == variantId
            })
            setSelectedVariant(variant[0])
        }
    }, [])
   
    const handleAddItem = () => { 
        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        })
        addToCart({
            variant,
            quantity: 1
        })
    }

    return (
        <div className="upsell">
            <div className="upsell__container">
                <div className="upsell__image">
                    <Image
                        className=""
                        src={`${selectedVariant.content.featuredMedia.src}`}
                        alt={ product.content.title }
                        layout="responsive"
                        objectFit="cover"
                        height="132"
                        width="108"
                    />
                </div>
                <div className="upsell__wrapper">
                    <div className="upsell__content">
                        <div className="upsell__title">{product.content.title}</div>
                        {selectedVariant.content.title !== "Default Title" ? (
                            <div className="upsell__option">{selectedVariant.content.title}</div>
                        ) : ""}
                    </div>
                    <div className="upsell__add-to-cart">
                        <div className="upsell__price">${selectedVariant.price }</div>
                        <button className="btn secondary" onClick={() => handleAddItem()}>
                            <span>Add</span>
                        </button>
                    </div>
                </div>
                
            </div>
            

        </div>
    )
};

export default Upsell;
