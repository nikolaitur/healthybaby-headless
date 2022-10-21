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

const findProductBadges = ({ content, products, productBadges }) => {
  if (content.fields?.productHandle && products && productBadges) {
    const handle = content.fields.productHandle.replace('::en-US', '')
    const product = products.find(
      (product) => product.content.handle === handle
    )
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
  const [isloading, setIsLoading] = useState(false)
  const [handle, setHandle] = useState(false)
  const [productPrice, setProductPrice] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 1074 })

  const cartDrawerContext = useCartDrawerContext()
  const modalContext = useModalContext()

  const badges = null

  useEffect(() => {
    setHandle(product.content.handle)
    getProdouctPrice(product)
  }, [handle])

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

  const getCtaText = () => {
    if (product && product.variants.length > 1) {
      return 'Quick View -'
    } else {
      return 'Add To Cart - '
    }
  }

  return (
    <div className={`collection-product-card`}>
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

        <div className="collection-product-card__reviews">
          <span
            className="junip-store-key"
            data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"
          ></span>
          <span
            className="junip-product-summary"
            data-product-id="4522469523505"
          ></span>
        </div>
        <div className="collection-product-card__cta">
          <button
            className="btn secondary quickview"
            onClick={() => openQuickView()}
          >
            <span>Quick View -</span>
            {productPrice ? (
              <>
                {`\u00A0`} ${productPrice}
              </>
            ) : (
              ''
            )}
          </button>
        </div>
      </div>
    </div>
  )
})

export default CrossSellProductCard
