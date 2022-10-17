import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'

import CollectionCard from '../../Cards/CollectionCard'

const CollectionCards = ({ content }) => {
    const {header, subheader, collectionCards } = {...content.fields}

    return (
        <section className="collection-cards">
            <div className="collection-cards__container container">
                <div className="collection-cards__content">
                    <h6 className="collection-cards__subheader">{ subheader }</h6>
                    {header && <h2 className="collection-cards__header">{ parse(header) }</h2>}
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
