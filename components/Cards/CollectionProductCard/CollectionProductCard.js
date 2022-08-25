import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { nacelleClient } from 'services'

const CollectionProductCard = ({ content }) => {
    const [isloading, setIsLoading] = useState(false)
    const { title, cardWidth } = content.fields
    // console.log(content, "CollectionProductCard")
    // const backgroundImage = content.fields.image.fields.file.url
    // console.log(content.fields?.image)

    if(content.fields?.handle) {
        const getProduct = async () => {
            await nacelleClient.products({
                handles: ["healthynest-diaper-training-pants"]
            }).then(response => console.log(response));
        }
    
        getProduct()
    }



    return (
        <div className={`collection-product-card ${cardWidth == "Full Width" ? "full-width" : ""}`}>
            <div className="collection-product-card__image">
                {content.fields?.image ? (
                        <Image
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height={695}
                            width={870}
                        />
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
                        <button className="btn secondary">Add To Cart</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CollectionProductCard
