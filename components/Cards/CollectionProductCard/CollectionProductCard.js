import { useEffect, useState, forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { getCartVariant } from 'utils/getCartVariant'
import { useMediaQuery } from 'react-responsive'
import { getProductPrice } from '@/utils/getProductPrice'

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

const CollectionProductCard = forwardRef(({
  content,
  products,
  productBadges,
  crossSell,
}, ref) => {
  const router = useRouter()
  const [, { addToCart }] = useCart()
  const [isloading, setIsLoading] = useState(false)
  const [handle, setHandle] = useState(false)
  const [product, setProduct] = useState(false)
  const [productPrice, setProductPrice] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(false)
  const { title, cardWidth } = content.fields
  const isCrossSell = { ...crossSell }
  const isDesktop = useMediaQuery(
    { minWidth: 1074 }
  )

  const cartDrawerContext = useCartDrawerContext()
  const modalContext = useModalContext()

  const badges = findProductBadges({ content, products, productBadges })

  useEffect(() => {
    if (content.fields?.productHandle && products) {
      setHandle(content.fields.productHandle.replace('::en-US', ''))
      setProduct(products.find((product) => product.content.handle === content.fields.productHandle.replace('::en-US', '')))
      setProductPrice(getProductPrice(products.find((product) => product.content.handle === content.fields.productHandle.replace('::en-US', ''))))
    }
  }, [handle])

  const handleLink = (product) => {
    dataLayerSelectProduct({ product, url: router.pathname })
    router.push(`/products/${handle}`)
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
    if (content.fields?.ctaText) {
      return content.fields.ctaText
    } else {
      if (product && product.variants.length > 1) {
        return 'Quick View -'
      } else {
        return 'Add To Cart - '
      }
    }
  }

  return (
    <div
      className={`collection-product-card ${
        cardWidth == 'Full Width' ? 'full-width' : ''
      }`}
    >

    {badges?.length > 0 &&
        <ul className="collection-product-card__badge-list">
            {badges.map((badge, index) => {
                return <li className="collection-product-card__badge" key={index}>
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

      <a className={cardWidth == 'Full Width' ? 'collection-product-card__image-wrapper--full-width' : ''} onClick={() => handleLink(product)} ref={ref}>
        <div
          className={`collection-product-card__image ${
            content.fields?.image && content.fields?.imageHover
              ? 'hide-mobile'
              : ''
          }`}
        >
          {content.fields?.image ? (
            <>
              <Image
                className="featured"
                src={`https:${content.fields.image.fields.file.url}`}
                alt={content.fields.image.fields.title}
                layout="responsive"
                objectFit="cover"
                height={cardWidth == 'Full Width' ? (!isDesktop ? 650 : 695) : 710}
                width={cardWidth == 'Full Width' ? 870 : 570}
              />
              {content.fields?.imageHover ? (
                <Image
                  className="hover"
                  src={`https:${content.fields.imageHover.fields.file.url}`}
                  alt={content.fields.imageHover.fields.title}
                  layout="responsive"
                  objectFit="cover"
                  height={cardWidth == 'Full Width' ? (!isDesktop ? 650 : 695) : 710}
                  width={cardWidth == 'Full Width' ? 870 : 570}
                />
              ) : (
                ''
              )}
            </>
          ) : (
            <div className="placeholder"></div>
          )}
        </div>
      </a>
      {content.fields?.image && content.fields?.imageHover ? (
        <a onClick={() => handleLink(product)}>
          <Swiper
            className="collection-product-card__slider"
            modules={[Lazy, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            lazy={true}
            pagination={true}
            style={{
              '--swiper-pagination-color': '#00B188',
            }}
          >
            <SwiperSlide>
              <Image
                className="featured"
                src={`https:${content.fields.image.fields.file.url}`}
                alt={content.fields.image.fields.title}
                layout="responsive"
                objectFit="cover"
                height={cardWidth == 'Full Width' ? 695 : 710}
                width={cardWidth == 'Full Width' ? 870 : 570}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="hover"
                src={`https:${content.fields.imageHover.fields.file.url}`}
                alt={content.fields.imageHover.fields.title}
                layout="responsive"
                objectFit="cover"
                height={cardWidth == 'Full Width' ? 695 : 710}
                width={cardWidth == 'Full Width' ? 870 : 570}
              />
            </SwiperSlide>
          </Swiper>
        </a>
      ) : (
        ''
      )}
      <div className="collection-product-card__content">
        {content.fields?.title ? (
          <a onClick={() => handleLink(product)}>
            <div className="collection-product-card__title">
              {content.fields.title}
            </div>
          </a>
        ) : (
          ''
        )}
        {content.fields?.subtitle ? (
          <p className="collection-product-card__subtitle">
            {content.fields.subtitle}
          </p>
        ) : (
          ''
        )}
        {/* {product.content?.description ? (
                    <p className="collection-product-card__subtitle">{ product.content.description  }</p>
                ) : ""} */}
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
          {isCrossSell ? (
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
          ) : product && product.variants.length > 1 ? (
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
      </div>
    </div>
  )
})

export default CollectionProductCard
