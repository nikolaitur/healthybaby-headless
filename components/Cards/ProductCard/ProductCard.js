import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ content }) => {
    const { title, media } = content.content

    let image = ""

    if(media.length > 0) {
        image = media[0].src
    }

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Link href="/">
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
                    <Link href="/">{ title }</Link>
                </div>
                <div className="product-card__subtitle">6 sizes available — Made with our patented magic channels</div>
                <div className="product-card__reviews">
                    <span className="junip-store-key" data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"></span>
                    <span className="junip-product-summary" data-product-id="4522469523505"></span>
                </div>
                <div className="product-card__price">$30</div>
            </div>
        </div>
    )
}

export default ProductCard
