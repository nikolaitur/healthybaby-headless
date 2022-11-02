import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { useModalContext } from '@/context/ModalContext'
import { getProductPrice } from '@/utils/getProductPrice'
import cartClient from 'services/nacelleClientCart'
import { getCartVariant } from 'utils/getCartVariant'
import { dataLayerATC, dataLayerSelectProduct, dataLayerViewProduct } from '@/utils/dataLayer'
import { useCartDrawerContext } from '@/context/CartDrawerContext'
import { useCustomerContext } from '@/context/CustomerContext'
import { nacelleClient } from 'services'
import { useRouter } from 'next/router'

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

const ProductCard = ({
  index,
  product,
  productBadges,
  showCTA = false,
  sizes = '(min-width: 768px) 100vw, (min-width: 1080) 40vw, 600px',
}) => {
  const [hasWindow, setHasWindow] = useState(false)
  const [, { addToCart }] = useCart()
  const modalContext = useModalContext()
  const cartDrawerContext = useCartDrawerContext()
  const { title, featuredMedia, handle } = { ...product.content }
  const productPrice = getProductPrice(product)
  const router = useRouter()
  const { customer } = useCustomerContext()

  useEffect(() => {
    setHasWindow(true)
  }, [])

  if (!featuredMedia) {
    return <></>
  }

  const getCtaText = () => {
    if (product && product.variants.length > 1) {
      return 'Quick Add -'
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
      })
      dataLayerSelectProduct({ customer, product, url: router.asPath, index })
      dataLayerViewProduct({ customer, product, url: router.asPath, index })
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

    const newItem = {
      product,
      variant,
      variantId: variant.id.replace('gid://shopify/ProductVariant/', ''),
      quantity: 1,
    }

    dataLayerATC({ customer, item: newItem, url: router.pathname })

    let itemAttributes = [{ key: "_variantSku", value: variant.sku}, {key: '_productType', value: product.productType}, { key: "_productId", value: product.sourceEntryId}]

    if(sellingPlan) {
      const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
      const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id
      itemAttributes.push({ key: "_sellingPlan", value: sellingPlanId})
    }

    const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
      cartId: Cookies.get('shopifyCartId'),
      lines: [
        {
          merchandiseId: selectedVariant.nacelleEntryId,
          nacelleEntryId: selectedVariant.nacelleEntryId,
          quantity: 1,
          attributes: itemAttributes
        },
      ],
    });

    // console.log( cart, userErrors, errors )

    if(cart) {
      // console.log("Subscription")
      cartDrawerContext.setShopifyCart(cart)
      cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
      cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
          return sum + line.quantity
      }, 0))
    }

    cartDrawerContext.setIsOpen(true)
  }

  const badges = findProductBadges({ product, productBadges })

  return (
    <div className="product-card">
      <div className="product-card__image">
        {badges?.length > 0 && (
          <ul className="product-card__badge-list">
            {badges.map((badge, index) => {
              return (
                <li className="product-card__badge" key={index}>
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
          <Link href={`/products/${handle}`}>{title}</Link>
        </div>
        {/* <div className="product-card__subtitle">6 sizes available — Made with our patented magic channels</div> */}
        {hasWindow && (
          <div className="product-card__reviews">
            <span
              className="junip-product-summary"
              data-product-id={product.sourceEntryId.replace(
                'gid://shopify/Product/',
                ''
              )}
            ></span>
          </div>
        )}
        {!showCTA && <div className="product-card__price">${productPrice}</div>}

        {showCTA && (
          <div className="product-card__cta-btn">
            {!product.availableForSale ? (
              <span className="btn disabled">
                <span>Out Of Stock</span>
              </span>
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
        )}
      </div>
    </div>
  )
}

export default ProductCard
