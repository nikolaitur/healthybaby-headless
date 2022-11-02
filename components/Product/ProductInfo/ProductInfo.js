import React from 'react'
import { useState, useEffect } from 'react'
import { useCart } from '@nacelle/react-hooks'
import { useCustomerContext } from '@/context/CustomerContext'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

import * as Cookies from 'es-cookie'

import { dataLayerATC } from '@/utils/dataLayer'
import { useRouter } from 'next/router'

import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import ProductOptions from '../../Product/ProductOptions'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useModalContext } from '../../../context/ModalContext'
import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import StarFull from '../../../svgs/star-full.svg'
import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import QuestionMark from '../../../svgs/question-mark.svg'

const ProductInfo = (props) => {
  const { product, page } = { ...props }

  const router = useRouter()

  const [, { addToCart }] = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedOptions, setSelectedOptions] = useState(
    selectedVariant.content.selectedOptions
  )
  const [selectedCombination, setSelectedCombination] = useState(true)
  const [isSubscription, setIsSubscription] = useState(false)
  const [subscriptionPrice, setSubscriptionPrice] = useState(false)
  const [purchaseSubscription, setPurchaseSubscription] = useState(false)
  const [isCheckedOneTime, setIsCheckedOneTime] = useState(true)
  const [isCheckedSubscription, setIsCheckedSubscription] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [diaperAmount, setDiaperAmount] = useState(false)
  const [messageProduct, setMessageProduct] = useState(false)
  const [hasWindow, setHasWindow] = useState(false)

  const { customer } = useCustomerContext()
  const cartDrawerContext = useCartDrawerContext()
  const modalContext = useModalContext()

  const richTextRenderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (node.data.target?.fields?.file?.url) {
          return `<img src=https:${node.data.target.fields.file.url} />`
        }
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        if (node.data.target?.fields?.file?.url) {
          return `<img src=https:${node.data.target.fields.file.url} />`
        }
      },
    },
  }

  let options = null

  if (product?.content?.options?.some((option) => option.values.length > 1)) {
    options = product?.content?.options
  }

  const handleOptionChange = (
    optionName,
    optionValue = false,
    index = activeOption
  ) => {
    const newOption = { name: optionName, value: optionValue }
    const optionIndex = selectedOptions.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name
    })

    const newSelectedOptions = [...selectedOptions]

    if (optionIndex > -1) {
      newSelectedOptions.splice(optionIndex, 1, newOption)
      setSelectedOptions([...newSelectedOptions])
    } else {
      setSelectedOptions([...newSelectedOptions, newOption])
    }

    const variant = getSelectedVariant({
      product,
      options: newSelectedOptions,
    })

    setSelectedVariant(variant ? { ...variant } : null)

    if (variant) {
      let sizeOption = variant.content.selectedOptions.filter((option) => {
        return option.name == 'Size'
      })

      if (sizeOption.length > 0) {
        let regExp = /\(([^)]+)\)/
        let match = regExp.exec(sizeOption[0].value)

        if (match) {
          if (match[1].includes('diapers')) {
            setDiaperAmount(match[1].replace(' diapers', ''))
          }
        }
      }
    }

    handleSubscriptionPrice(variant)
  }

  const handleCheckBoxChange = (option) => {
    setSelectedCombination(!selectedCombination)

    let optionValue = !selectedCombination ? option.values[0] : option.values[1]

    handleOptionChange(option.name, optionValue)
  }

  const handleSubscriptionChange = (event) => {
    const value = event.target.value

    setPurchaseSubscription(value)

    if (value === 'Subscription') {
      setIsCheckedOneTime(false)
      setIsCheckedSubscription(true)
    } else {
      setIsCheckedOneTime(true)
      setIsCheckedSubscription(false)
    }
  }

  const handleSubscriptionPrice = (newVariant = selectedVariant) => {
    let sellingPlan = newVariant.metafields.find(
      (metafield) => metafield.key === 'sellingPlanAllocations'
    )

    if (sellingPlan) {
      const sellingPlanPriceValue = JSON.parse(sellingPlan.value)
      const sellingPlanPrice =
        sellingPlanPriceValue[0].sellingPlan.priceAdjustments

      setSubscriptionPrice(
        Math.round(sellingPlanPriceValue[0].priceAdjustments[0].price.amount)
      )
    }
  }

  const handleDecrementChange = () => {
    if (quantity <= 1) {
      setQuantity(1)
    } else {
      setQuantity(--quantity)
    }
  }

  const handleIncrementChange = () => {
    setQuantity(++quantity)
  }

  // Get product data and add it to the cart by using `addToCart`
  // from the `useCart` hook provided by `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const handleAddItem = async () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant,
    })

    console.log("add", purchaseSubscription)

    if (purchaseSubscription === 'Subscription') {
      let sellingPlan = selectedVariant.metafields.find(
        (metafield) => metafield.key === 'sellingPlanAllocations'
      )

      let lineItem = {
        merchandiseId: selectedVariant.nacelleEntryId,
        nacelleEntryId: selectedVariant.nacelleEntryId,
        quantity: quantity,
      }

      if (!sellingPlan) {
        sellingPlan = false
      } else {
        const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
        const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id
        const sellingPlanDiscount = sellingPlanAllocationsValue[0].sellingPlan.priceAdjustments[0].adjustmentValue.adjustmentPercentage

        lineItem = {
          merchandiseId: selectedVariant.nacelleEntryId,
          nacelleEntryId: selectedVariant.nacelleEntryId,
          quantity: quantity,
          sellingPlanId,
          attributes: [
            { key: '_subscription', value: sellingPlanId },
            { key: '_subscriptionDiscount', value: sellingPlanDiscount },
            { key: '_variantSku', value: variant.sku },
            { key: '_productId', value: product.sourceEntryId },
          ],
        }
      }

      const newItem = {
        product,
        variant,
        variantId: variant.id.replace('gid://shopify/ProductVariant/', ''),
        quantity,
      }

      dataLayerATC({ customer, item: newItem, url: router.asPath })

      const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
        cartId: Cookies.get('shopifyCartId'),
        lines: [lineItem],
      })

      if (cart) {
        cartDrawerContext.setShopifyCart(cart)
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(
          cart.lines.reduce((sum, line) => {
            return sum + line.quantity
          }, 0)
        )
      }
    } else {
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
        quantity,
      }

      dataLayerATC({ customer, item: newItem, url: router.asPath })

      let itemAttributes = [
        { key: '_variantSku', value: variant.sku },
        { key: '_productId', value: product.sourceEntryId },
      ]

      if (sellingPlan) {
        const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
        const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id
        const sellingPlanDiscount = sellingPlanAllocationsValue[0].sellingPlan.priceAdjustments[0].adjustmentValue.adjustmentPercentage

        itemAttributes.push({ key: '_sellingPlan', value: sellingPlanId })
        itemAttributes.push({ key: '_subscriptionDiscount', value: sellingPlanDiscount.toString() })
      }

      const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
        cartId: Cookies.get('shopifyCartId'),
        lines: [
          {
            merchandiseId: selectedVariant.nacelleEntryId,
            nacelleEntryId: selectedVariant.nacelleEntryId,
            quantity: quantity,
            attributes: itemAttributes,
          },
        ],
      })

      if (cart) {
        cartDrawerContext.setShopifyCart(cart)
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(
          cart.lines.reduce((sum, line) => {
            return sum + line.quantity
          }, 0)
        )
      }
    }

    cartDrawerContext.setIsOpen(true)
    modalContext.setIsOpen(false)
  }

  const openSubscribeInfoModal = async () => {
    const pages = await nacelleClient.content({
      handles: ['subscribe-info-modal'],
    })

    if (pages) {
      modalContext.setSecondaryModalType('subscribe-info-modal')
      modalContext.setIsSecondaryModalOpen(true)
      modalContext.setSecondaryModalContent({
        product: null,
        page: pages[0],
        className: 'subscribe-modal',
      })
    }
  }

  useEffect(() => {
    const sellingPlanAllocations = selectedVariant.metafields.find(
      (metafield) => metafield.key === 'sellingPlanAllocations'
    )

    setIsSubscription(sellingPlanAllocations)

    if (sellingPlanAllocations) {
      setIsSubscription(sellingPlanAllocations)

      handleSubscriptionPrice()
    }

    const getDiaperCount = () => {
      if (selectedVariant) {
        const variant = getCartVariant({
          product,
          variant: selectedVariant,
        })

        if (variant) {
          let sizeOption = variant.selectedOptions.filter((option) => {
            return option.name == 'Size'
          })

          if (sizeOption.length > 0) {
            let regExp = /\(([^)]+)\)/
            let match = regExp.exec(sizeOption[0].value)

            if (match) {
              if (match[1].includes('diapers')) {
                setDiaperAmount(match[1].replace(' diapers', ''))
              }
            }
          }
        }
      }
    }

    const getMessageProduct = async () => {
      if (page?.fields?.messageProduct) {
        const handle = page.fields.messageProduct.replace('::en-US', '')
        const product = await nacelleClient.products({
          handles: [handle],
        })
        setMessageProduct(product[0])
      }
    }

    getDiaperCount()
    getMessageProduct()
    setHasWindow(true)
  }, [])

  return product ? (
    <div className="product-info">
      <div className="product-info__sticky">
        <div className="product-info__reviews">
          {hasWindow && (
            <span
              className="junip-product-summary"
              data-product-id={product.sourceEntryId.replace(
                'gid://shopify/Product/',
                ''
              )}
            ></span>
          )}
        </div>

        {product.content?.title && (
          <h1 className="product-info__title h3">{product.content.title}</h1>
        )}
        {page?.fields?.productDescription ? (
          <div className="product-info__description">
            {page.fields.productDescription}
          </div>
        ) : (
          ''
        )}
        <h4 className="product-info__price">
          <>
            {purchaseSubscription === 'Subscription'
              ? `$${Number(subscriptionPrice).toFixed(2)}`
              : `$${selectedVariant.price.toFixed(2)}`}
          </>
        </h4>
        <div className="product-form">
          <div className="product-form__options">
            {options &&
              options.map((option, oIndex) => {
                let type = option.name

                switch (type) {
                  case 'Combination':
                    return (
                      <div
                        className="product-form__add-on"
                        onClick={() => handleCheckBoxChange(option)}
                      >
                        <div className="product-form__add-on--image">
                          {page?.fields?.productAddOnImage?.fields?.file
                            ?.url ? (
                            <Image
                              src={`https:${page.fields.productAddOnImage.fields.file.url}`}
                              alt={`messageProduct.content.title`}
                              width={72}
                              height={72}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="product-form__add-on--content">
                          <div className="product-form__add-on--title">
                            {page?.fields?.productAddOnText
                              ? page.fields.productAddOnText
                              : 'Add a 4-pk of Wipes?'}
                          </div>
                          <div className="product-form__add-on--price">
                            {page?.fields?.productAddOnPrice
                              ? `+$${page.fields.productAddOnPrice}`
                              : '+$27'}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={!selectedCombination}
                        ></input>
                      </div>
                    )
                  default:
                    return (
                      <ProductOptions
                        option={option}
                        handleOptionChange={handleOptionChange}
                        diaperAmount={diaperAmount}
                        product={product}
                        key={oIndex}
                      />
                    )
                }
              })}
          </div>

          {isSubscription ? (
            <div
              className="product-form__subscription"
              onChange={(event) => handleSubscriptionChange(event)}
            >
              <div
                className={`product-form__input-wrapper ${
                  isCheckedOneTime ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  id="onetimeOption"
                  name="subscription"
                  value="One Time"
                  checked={isCheckedOneTime}
                />
                <label htmlFor="onetimeOption">
                  One-Time Purchase{' '}
                  <span className="price">
                    ${selectedVariant.price.toFixed(2)}
                  </span>
                </label>
              </div>
              <div
                className={`product-form__input-wrapper ${
                  isCheckedSubscription ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  id="subscriptionOption"
                  name="subscription"
                  value="Subscription"
                  checked={isCheckedSubscription}
                />
                <label htmlFor="subscriptionOption">
                  Auto Delivery <br />
                  <span>
                    Update sizing or pause anytime
                    <span
                      className="question-mark"
                      onClick={() => openSubscribeInfoModal()}
                    >
                      <QuestionMark />
                    </span>
                  </span>
                  <span className="price">
                    <s>${selectedVariant.price.toFixed(2)}</s> $
                    {Number(subscriptionPrice).toFixed(2)}
                  </span>
                </label>
              </div>
            </div>
          ) : (
            ''
          )}

          <div className="product-form__add-to-cart">
            <div className="product-form__quantity">
              <button
                className="product-form__quantity--decrement"
                onClick={() => handleDecrementChange()}
              >
                <Minus />
              </button>
              <div
                className="product-form__quantity--count"
                aria-label="product quantity"
              >
                {quantity}
              </div>
              <button
                className="product-form__quantity--increment"
                onClick={() => handleIncrementChange()}
              >
                <Plus />
              </button>
            </div>

            {selectedVariant.availableForSale ? (
              <button
                className="product-form__submit btn secondary full-width"
                onClick={() => handleAddItem()}
              >
                Add To Cart
              </button>
            ) : (
              <button className="product-form__submit btn secondary full-width disabled">
                Out of Stock
              </button>
            )}
          </div>

          <div className="product-status">
            {selectedVariant.availableForSale ? (
              <p>
                <span>• In Stock</span> Ships within 1-2 business days.
              </p>
            ) : (
              ''
            )}
            <p>Complimentary shipping over $100</p>
          </div>

          {messageProduct ? (
            <div className="product-message">
              {page.fields?.messageTitle ? (
                <p className="product-message__title large">
                  {page.fields.messageTitle}
                </p>
              ) : (
                ''
              )}
              <div className="product-message__wrapper">
                <div className="product-message__image">
                  {messageProduct ? (
                    <Image
                      src={messageProduct.content.featuredMedia.src}
                      alt={messageProduct.content.title}
                      width={72}
                      height={72}
                    />
                  ) : (
                    ''
                  )}
                </div>
                {page.fields?.messageText ? (
                  <p className="product-message__text large">
                    {page.fields.messageText}
                  </p>
                ) : (
                  ''
                )}
                <Link href={messageProduct.content.handle}>
                  <div className="product-message__link">
                    <span>Shop Now</span>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}

          {page?.fields?.productDetailTabTitle1 &&
          page.fields?.productDetailTabContent1 ? (
            <div className="product-tabs">
              <div className="product-tabs__nav">
                {page.fields?.productDetailTabTitle1 &&
                page.fields?.productDetailTabContent1 ? (
                  <div
                    className={`product-tabs__title ${
                      activeTab == 0 ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(0)}
                  >
                    {page.fields.productDetailTabTitle1}
                  </div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle2 &&
                page.fields?.productDetailTabContent2 ? (
                  <div
                    className={`product-tabs__title ${
                      activeTab == 1 ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(1)}
                  >
                    {page.fields.productDetailTabTitle2}
                  </div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle3 &&
                page.fields?.productDetailTabContent3 ? (
                  <div
                    className={`product-tabs__title ${
                      activeTab == 2 ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(2)}
                  >
                    {page.fields.productDetailTabTitle3}
                  </div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle4 &&
                page.fields?.productDetailTabContent4 ? (
                  <div
                    className={`product-tabs__title ${
                      activeTab == 3 ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(3)}
                  >
                    {page.fields.productDetailTabTitle4}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="product-tabs__content">
                {page.fields?.productDetailTabTitle1 &&
                page.fields?.productDetailTabContent1 ? (
                  <div
                    className={`product-tabs__tab ${
                      activeTab == 0 ? 'active' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        page.fields.productDetailTabContent1,
                        richTextRenderOptions
                      ),
                    }}
                  ></div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle2 &&
                page.fields?.productDetailTabContent2 ? (
                  <div
                    className={`product-tabs__tab ${
                      activeTab == 1 ? 'active' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        page.fields.productDetailTabContent2,
                        richTextRenderOptions
                      ),
                    }}
                  ></div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle3 &&
                page.fields?.productDetailTabContent3 ? (
                  <div
                    className={`product-tabs__tab ${
                      activeTab == 2 ? 'active' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        page.fields.productDetailTabContent3,
                        richTextRenderOptions
                      ),
                    }}
                  ></div>
                ) : (
                  ''
                )}
                {page.fields?.productDetailTabTitle4 &&
                page.fields?.productDetailTabContent4 ? (
                  <div
                    className={`product-tabs__tab ${
                      activeTab == 3 ? 'active' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        page.fields.productDetailTabContent4,
                        richTextRenderOptions
                      ),
                    }}
                  ></div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default ProductInfo
