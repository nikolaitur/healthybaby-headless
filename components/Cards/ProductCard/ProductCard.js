import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { useModalContext } from '@/context/ModalContext'
import { getProductPrice } from '@/utils/getProductPrice'
import cartClient from 'services/nacelleClientCart'
import { getCartVariant } from 'utils/getCartVariant'
import { dataLayerATC } from '@/utils/dataLayer'
import { useCartDrawerContext } from '@/context/CartDrawerContext'
import { nacelleClient } from 'services'

const findProductBadges = ({ product, productBadges }) => {
    if (productBadges) {
        const badges = productBadges.reduce((carry, badge) => {
            if (product?.tags.some((tag) => tag.indexOf(badge.handle) > -1)) {
                if (badge?.fields?.image?.fields) {
                return [...carry, badge.fields.image.fields]
                }
            }
            return carry
        }, [])

        if (badges.length) {
            return badges
        }
    }
    return null
}


const ProductCard = ({ product, productBadges, showCTA = false, sizes = "(min-width: 768px) 100vw, (min-width: 1080) 40vw, 600px" }) => {

    const [, { addToCart }] = useCart()
    const modalContext = useModalContext()
    const cartDrawerContext = useCartDrawerContext()
    const { title, featuredMedia, handle } = {...product.content}
    const productPrice = getProductPrice(product)

    if (!featuredMedia) {
        return <></>
    }

    const getCtaText = () => {
        if (product && product.variants.length > 1) {
            return 'Quick View -'
        } else {
            return 'Add To Cart - '
        }
    }

    const openQuickView = async () => {
        const pages = await nacelleClient.content({
          handles: [product.content.handle],
          type: 'product',
        })
        if (pages) {
          modalContext.setIsOpen(false)
          modalContext.setModalType('quickview')
          modalContext.setIsOpen(true)
          modalContext.setContent({
            product,
            page: pages[0],
            className: 'quickview',
          })
        }
    }

    const handleAddItem = async () => {
        console.log('added')
        let selectedVariant = product.variants[0]

        const variant = getCartVariant({
          product,
          variant: selectedVariant,
        })

        let sellingPlan = selectedVariant.metafields.find(
          (metafield) => metafield.key === 'sellingPlanAllocations'
        )

        if (!sellingPlan) {
          sellingPlan = false
        }

        const newItem = {
          product,
          variant,
          variantId: variant.id.replace('gid://shopify/ProductVariant/', ''),
          quantity: 1,
        }

        console.log(newItem)

        dataLayerATC({ item: newItem })

        addToCart({
          product,
          variant,
          quantity: 1,
          sellingPlan,
          subscription: false,
          nacelleEntryId: selectedVariant.nacelleEntryId,
          selectedVariant,
        })

        await cartClient
          .cartLinesAdd({
              cartId: cartDrawerContext.shopifyCartId,
              lines: [
              {
                  merchandiseId: selectedVariant.nacelleEntryId,
                  nacelleEntryId: selectedVariant.nacelleEntryId,
                  quantity: 1,
              },
              ],
          })
          .then((res) => {
              console.log(res)
          })
          .catch((err) => {
              console.error(err, 'Error')
          })

        cartDrawerContext.setIsOpen(true)

        console.log(cartDrawerContext.shopifyCartId)

        await cartClient
          .cartLinesAdd({
            cartId: cartDrawerContext.shopifyCartId,
            lines: [
              {
                merchandiseId: selectedVariant.nacelleEntryId,
                nacelleEntryId: selectedVariant.nacelleEntryId,
                quantity: 1,
              },
            ],
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.error(err, 'Error')
          })

        cartDrawerContext.setIsOpen(true)
      }

    const badges = findProductBadges({product, productBadges})

    return (
        <div className="product-card">
            <div className="product-card__image">
                {badges?.length > 0 &&
                    <ul className="product-card__badge-list">
                        {badges.map((badge, index) => {
                            return <li className="product-card__badge" key={index}>
                                <Image
                                    src={`https:${badge.file.url}`}
                                    alt={badge.title}
                                    layout="responsive"
                                    objectFit="cover"
                                    height={100}
                                    width={100}
                                />
                            </li>
                        })}
                    </ul>
                }
                <Link href={`/products/${handle}`}>
                    <a>
                        <Image
                            src={featuredMedia.src}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            sizes={sizes}
                        />
                    </a>
                </Link>
            </div>
            <div className="product-card__content">
                <div className="product-card__title">
                    <Link href="/">{ title }</Link>
                </div>
                {/* <div className="product-card__subtitle">6 sizes available — Made with our patented magic channels</div> */}
                {!showCTA && <div className="product-card__price">${productPrice}</div> }
                <div className="product-card__reviews"></div>
                {showCTA &&
                    <div className="product-card__cta-btn">
                        {product && product.variants.length > 1 ? (
                            <button
                                className="btn secondary quickview"
                                onClick={() => openQuickView()}
                            >
                                <span>{getCtaText()}</span>
                                {productPrice ? (
                                    <>
                                    {`\u00A0`} ${productPrice}
                                    </>
                                ) : (
                                    ''
                                )}
                            </button>
                        ) : (
                            <button className="btn secondary" onClick={() => handleAddItem()}>
                                <span>{getCtaText()}</span>
                                {productPrice ? (
                                    <>
                                    {`\u00A0`} ${productPrice}
                                    </>
                                ) : (
                                    ''
                                )}
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductCard
