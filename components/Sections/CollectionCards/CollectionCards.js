import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import CollectionCard from '../../Cards/CollectionCard'

const CollectionCards = ({ content }) => {
    const {header, headerFontStyle, subheader, collectionCards } = content.fields

    return (
        <section className="collection-cards">
            <div className="collection-cards__container container">
                <div className="collection-cards__content">
                    <div className="collection-cards__subheader">{ subheader }</div>
                    <div className={`collection-cards__header ${headerFontStyle.toLowerCase()}`}>{ header }</div>
                </div>
                <div className="collection-cards__wrapper">
                    {collectionCards.map((card, index) => (
                        <CollectionCard content={card} key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CollectionCards
