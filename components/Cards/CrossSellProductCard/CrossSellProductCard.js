import { useEffect, useState, forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { getCartVariant } from 'utils/getCartVariant'
import { useMediaQuery } from 'react-responsive'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useModalContext } from '../../../context/ModalContext'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Lazy, Pagination } from 'swiper'

import { dataLayerATC, dataLayerSelectProduct } from '@/utils/dataLayer'
import { useRouter } from 'next/router'

import 'swiper/css'
import 'swiper/css/pagination'

const findProductBadges = ({ product, productBadges }) => {
  if (product && productBadges) {
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

const CrossSellProductCard = forwardRef(({ product }, ref) => {
  const router = useRouter()
  const [, { addToCart }] = useCart()
  const [hasWindow, setHasWindow] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [handle, setHandle] = useState(false)
  const [productPrice, setProductPrice] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 1074 })
  const [productBadges, setProductBadges] = useState(false)

  const cartDrawerContext = useCartDrawerContext()
  const modalContext = useModalContext()

  const badges = findProductBadges({ product, productBadges })

  useEffect(() => {
    setHandle(product.content.handle)
    getProdouctPrice(product)
  }, [handle])

  useEffect(() => {
    const getProductBadges = async () => {
      const productBadges = await nacelleClient.content({
        type: 'productBadge',
      })

      setProductBadges(productBadges)
    }

    getProductBadges()
    setHasWindow(true)
  }, [])

  const handleLink = (product) => {
    dataLayerSelectProduct({ product, url: router.pathname })
    router.push(`/products/${handle}`)
  }

  const getProdouctPrice = (product) => {
    if (product.variants.length > 1) {
      let lowestPrice = product.variants.reduce(function (prev, curr) {
        return prev.price < curr.price ? prev : curr
      })
      setProductPrice(lowestPrice.price)
    } else {
      setProductPrice(product.variants[0].price)
    }
  }

  const openQuickView = async () => {
    const pages = await nacelleClient.content({
      handles: [handle],
      type: 'product',
    })

    if (pages) {
      modalContext.setIsOpen(false)
      modalContext.setModalType('quickview')
      modalContext.setIsOpen(true)
      modalContext.setContent({
        product,
        page: pages[0]
      })
    }
  }

  return (
    <div className={`collection-product-card`}>
      {badges?.length > 0 && (
        <ul className="collection-product-card__badge-list">
          {badges.map((badge, index) => {
            return (
              <li className="collection-product-card__badge" key={index}>
                <Image
                  src={`https:${badge.file.url}`}
                  alt={badge.title}
                  layout="responsive"
                  objectFit="cover"
                  height={100}
                  width={100}
                />
              </li>
            )
          })}
        </ul>
      )}
      <a onClick={() => handleLink(product)} ref={ref}>
        <div className={`collection-product-card__image`}>
          <Image
            className="featured"
            src={`${product.content.featuredMedia.src}`}
            alt={product.content.featuredMedia.altText}
            layout="responsive"
            objectFit="cover"
            height={710}
            width={570}
          />
        </div>
      </a>

      <div className="collection-product-card__content">
        <a onClick={() => handleLink(product)}>
          <div className="collection-product-card__title">
            {product.content.title}
          </div>
        </a>

        {hasWindow && <div className="collection-product-card__reviews">
          <span
            className="junip-product-summary"
            data-product-id={product.sourceEntryId.replace('gid://shopify/Product/', '')}
          ></span>
        </div>}
        <div className="collection-product-card__cta">
          {!product.availableForSale ? (
            <span className="btn disabled">
              <span>Out Of Stock</span>
            </span>
          ):(
            <button
              className="btn secondary quickview"
              onClick={() => openQuickView()}
            >
              <span>Quick Add -</span>
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
      </div>
    </div>
  )
})

export default CrossSellProductCard
