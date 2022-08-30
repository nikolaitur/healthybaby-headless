import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { nacelleClient } from 'services'

const CollectionProductCard = ({ content }) => {
    const [isloading, setIsLoading] = useState(false)
    const [productPrice, setProductPrice] = useState(false)
    const { title, cardWidth } = content.fields
    //console.log(content, "CollectionProductCard")
    // const backgroundImage = content.fields.image.fields.file.url
    // console.log(content.fields?.image)

    if(content.fields?.handle) {
        // console.log(content, "CollectionProductCard")
        const getProduct = async () => {
            await nacelleClient.products({
                handles: ["healthynest-diaper-training-pants"]
                // handles: ["cleaning-concentrate"]
            }).then(response => {
                // console.log(response[0])
                getProdouctPrice(response[0])
            });
        }
    
        getProduct()
    }

    const getProdouctPrice = (product) => {
        if(product.variants.length > 1) {
            let lowestPrice = product.variants.reduce(function(prev, curr) {
                return prev.price < curr.price ? prev : curr;
            });
            setProductPrice(lowestPrice.price)
        }
    }

    const getCtaText = (product) => {
        // if(content.fields?)
    }

    const getLowestVariantPrice = () => {

    }

    return (
        <div className={`collection-product-card ${cardWidth == "Full Width" ? "full-width" : ""}`}>
            <div className="collection-product-card__image">
                {content.fields?.image ? (
                    <>
                        <Image
                            className="featured"
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height={cardWidth == "Full Width" ? 695 : 710}
                            width={cardWidth == "Full Width" ? 870 : 570}
                        />
                        {content.fields?.imageHover ? (
                            <Image
                                className="hover"
                                src={`https:${content.fields.imageHover.fields.file.url}`}
                                alt={content.fields.imageHover.fields.title}
                                layout="responsive"
                                objectFit="cover"
                                height={cardWidth == "Full Width" ? 695 : 710}
                                width={cardWidth == "Full Width" ? 870 : 570}
                            />
                        ) : ""}
                    </>
                    ) : (
                    <div className="placeholder"></div>
                )}
            </div>
            <div className="collection-product-card__content">
                <div className="collection-product-card__title">{ title }</div>
                <p className="collection-product-card__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="collection-product-card__reviews"></div>
                <div className="collection-product-card__cta">
                    <Link href={`#`}>
                        <button className="btn secondary"><span>Add To Cart </span>{productPrice ? <>&nbsp;- ${productPrice}</> : ""}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CollectionProductCard
