import React, { useRef, createRef } from 'react'
import { useRouter } from 'next/router'
import CollectionCallout from '../../Sections/CollectionCallout'
import CollectionProductCard from '../../Cards/CollectionProductCard'
import DiaperFinderCard from '../../Cards/DiaperFinderCard'
import VitaminFinder from '../../Cards/VitaminFinder'
import parse from 'html-react-parser'

const CollectionGrid = ({ content, products, productBadges }) => {
    const sectionItems = content.fields.sections
    const { header, subheader } = {...content.fields}
    const router = useRouter()
    const myRefs = useRef([]);

    console.log("content:", content)

    return (
        <section className="collection-grid" data-background-color={content.fields?.backgroundColor ? content.fields.backgroundColor : ""}>
            <div className="collection-grid__container container">
                <div className={`collection-grid__content ${router.pathname !== `/shop-all` ? "hide" : ""}`}>
                    {header && <h5 className={`collection-grid__header`}>{ parse(header) }</h5>}
                    {subheader && <p className="collection-grid__subheader large">{ subheader }</p>}
                </div>
                {content.fields?.sections ? (
                    <div className="collection-grid__wrapper">
                        {content.fields.sections.map((item, index) => {
                            let type = item.type;
                            const cardRef = createRef()
                            myRefs.current[index] = cardRef

                            switch (type) {
                                case 'collectionProductCard':
                                    return <CollectionProductCard index={index} ref={cardRef} content={item} products={products} productBadges={productBadges} key={index} />
                                case 'collectionCallout':
                                    return <CollectionCallout index={index} content={item} key={index} />
                                case 'diaperCalculator':
                                    return <DiaperFinderCard index={index} refs={myRefs} content={item} key={index} />
                                case 'vitaminFinder':
                                    return <VitaminFinder index={index} refs={myRefs} content={item} key={index} />
                                default:
                                return null
                            }
                        })}
                    </div>
                ) : ""}
            </div>
        </section>
    )
}

export default CollectionGrid
