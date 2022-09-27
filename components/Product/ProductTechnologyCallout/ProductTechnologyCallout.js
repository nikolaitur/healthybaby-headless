import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductTechnologyCallout = ({ props }) => {

    useEffect(() => {
        
    }, [])

    return (
        <div className="product-technology-callout">
            <div className="product-technology-callout__container container">
                <div className="product-technology-callout__content">
                    <h6 className="product-technology-callout__subheader">ELEVATED PERFORMANCE</h6>
                    <h3 className="product-technology-callout__header">A new standard in safety & performance</h3>
                    <h4 className="product-technology-callout__description large">Manufactured in Europe with innovative, proprietary technology</h4>
                </div>
                <div className="product-technology-callout__items">
                    <div className="product-technology-callout__item">
                        <div className="product-technology-callout__image">
                            <Image
                                className=""
                                src={`https://images.ctfassets.net/urdrzzac4igp/6sskhDzuJyETuNKbko2S6K/01ff821ad6e8bc223904990841b909b6/Mask_group__23_.png`}
                                alt={`image`}
                                layout="responsive"
                                objectFit="cover"
                                height="715"
                                width="535"
                            />
                        </div>
                        <div className="product-technology-callout__wrapper">
                            <h3>Magic Channels + Flash Dry Technologies</h3>
                            <h4>Wicks moisture away & fresh keep air flowing with 30% better leak protection.</h4>
                        </div>
                    </div>
                    <div className="product-technology-callout__item flipped">
                        <div className="product-technology-callout__image">
                            <Image
                                className=""
                                src={`https://images.ctfassets.net/urdrzzac4igp/6sskhDzuJyETuNKbko2S6K/01ff821ad6e8bc223904990841b909b6/Mask_group__23_.png`}
                                alt={`image`}
                                layout="responsive"
                                objectFit="cover"
                                height="715"
                                width="535"
                            />
                        </div>
                        <div className="product-technology-callout__wrapper">
                            <h3>Magic Channels + Flash Dry Technologies</h3>
                            <h4>Wicks moisture away & fresh keep air flowing with 30% better leak protection.</h4>
                        </div>
                    </div>
                    <div className="product-technology-callout__item">
                        <div className="product-technology-callout__image">
                            <Image
                                className=""
                                src={`https://images.ctfassets.net/urdrzzac4igp/6sskhDzuJyETuNKbko2S6K/01ff821ad6e8bc223904990841b909b6/Mask_group__23_.png`}
                                alt={`image`}
                                layout="responsive"
                                objectFit="cover"
                                height="715"
                                width="535"
                            />
                        </div>
                        <div className="product-technology-callout__wrapper">
                            <h3>Magic Channels + Flash Dry Technologies</h3>
                            <h4>Wicks moisture away & fresh keep air flowing with 30% better leak protection.</h4>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default ProductTechnologyCallout
