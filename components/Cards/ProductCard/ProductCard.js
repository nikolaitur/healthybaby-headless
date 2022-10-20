import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ content }) => {
    const { title, media, handle } = content.content

    let image = ""

    if(media.length > 0) {
        image = media[0].src
    }

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Link href={`/products/${handle}`}>
                    <a>
                        {image ?
                            <Image
                                src={image}
                                alt={title}
                                width="570"
                                height="455"
                            />
                        :
                            <Image
                                src="https://placeimg.com/570/455/people"
                                alt={title}
                                width="570"
                                height="455"
                            />
                        }
                    </a>
                </Link>
            </div>
            <div className="product-card__content">
                <div className="product-card__title">
                    <Link href={`/products/${handle}`}>{ title }</Link>
                </div>
                <div className="product-card__subtitle">6 sizes available — Made with our patented magic channels</div>
                <div className="product-card__reviews"></div>
                <div className="product-card__price">$30</div>
            </div>
        </div>
    )
}

export default ProductCard
