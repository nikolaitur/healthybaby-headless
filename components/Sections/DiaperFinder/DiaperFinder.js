import { useState, useEffect } from 'react'
import Select, { components } from 'react-select'
import { nacelleClient } from 'services'
import cartClient from '../../../services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'
import Image from 'next/image'
import Link from 'next/link'
import DatePicker from 'react-datepicker'

import * as Cookies from 'es-cookie'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import 'react-datepicker/dist/react-datepicker.css'

import LongArrowRight from '../../../svgs/long-arrow-right.svg'
import CheckCircle from '../../../svgs/check-circle.svg'
import DiaperFinderDetail from '../../../svgs/diaper-finder-detail.svg'
import DiaperFinderDetailMobile from '../../../svgs/diaper-finder-detail-mobile.svg'

const DiaperFinder = ({ content }) => {
  const {
    image,
    mobileImage,
    description,
    ctaTextColor,
    ctaHoverTextColor,
    ctaBackgroundColor,
    ctaHoverBackgroundColor,
  } = { ...content.fields }

  const genderOptions = [
    { value: 'He', label: 'He' },
    { value: 'She', label: 'She' },
    { value: 'They', label: 'They' },
  ]

  let intialValues = {
    name: '/',
    gender: genderOptions[0],
    birthday: null,
    weight: '0',
  }

  const [, { addToCart }] = useCart()
  const [isActive, setIsActive] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [babyName, setBabyName] = useState('')
  const [diaperFinderData, setDiaperFinderData] = useState(intialValues)
  const [weight, setWeight] = useState(0)
  const [product, setProduct] = useState(false)
  const [prenatalProduct, setPrenatalProduct] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(false)

  const cartDrawerContext = useCartDrawerContext()

  const showDiaperResults = () => {
    getProductRecommendation()
  }

  const clearDiaperResults = () => {
    setIsActive(false)
    setDiaperFinderData(intialValues)
    setProduct(false)
    setSelectedVariant(false)
  }

  const customSelectStyles = {
    control: () => ({
      background: 'transparent',
      width: 'auto',
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
    input: () => ({
      margin: '2px',
      paddingBottom: '2px',
      paddingTop: '2px',
      visibility: 'visible',
      color: '#A0B0D2',
      flex: '1 1 auto',
      display: 'inline-grid',
      gridArea: '1/1/2/3',
      gridTemplateColumns: '0 min-content',
      borderBottom: '1px dashed #A0B0D2',
      cursor: 'pointer',
    }),
    singleValue: () => ({
      color: '#A0B0D2',
      gridArea: '1/1/2/3',
      margin: '0 2px',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    }),
    menu: () => ({
      position: 'absolute',
      background: '#A0B0D2',
      width: '290px',
      padding: '24px 20px',
    }),
    option: (provided, state) => ({
      fontFamily: 'DomaineText',
      fontStyle: 'italic',
      fontWeight: '500',
      color: '#fff',
      padding: '7px 0',
      cursor: 'pointer',
      transition: '0.3ms',
      '&:hover': {
        color: '#4161A5',
      },
    }),
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name == 'baby-name') {
      setBabyName(value)
    } else {
      if (isNaN(value)) {
        setWeight(0)
      } else {
        if (value.length > 2) {
          return false
        }
        setWeight(Number(value))
      }
    }

    console.log(value)

    setDiaperFinderData((diaperFinderData) => ({
      ...diaperFinderData,
      [name]: value,
    }))
  }

  const onSelectChange = (selectedOption) => {
    let gender = selectedOption.value
    setDiaperFinderData((diaperFinderData) => ({
      ...diaperFinderData,
      gender: gender,
    }))
  }

  const getMonthDifference = (startDate, endDate) => {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    )
  }

  const getPrenantalRecommendation = () => {
    let today = new Date()
    let due = new Date(startDate)

    const differenceInTime = due.getTime() - today.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)

    if (differenceInDays < 0) {
      getProduct('our-prenatal-4th-trimester-postnatal', 0, true)
    } else if (differenceInDays > 0 && differenceInDays <= 84) {
      getProduct('our-prenatal-3rd-trimester', 0, true)
    } else if (differenceInDays >= 85 && differenceInDays <= 177) {
      getProduct('our-prenatal-2nd-trimester', 0, true)
    } else if (differenceInDays >= 178) {
      getProduct('our-prenatal-preconception-1st-trimester', 0, true)
    }

    setPrenatalProduct(true)
  }

  const getProductRecommendation = () => {
    if (!startDate) {
      setIsActive(true)
      return false
    }

    let today = new Date()
    let babyMonth = getMonthDifference(startDate, today)
    console.log(getMonthDifference(startDate, today), Number(weight), 'Weight')

    if (babyMonth <= 0) {
      getPrenantalRecommendation()
      return
    }

    if (weight < 6) {
      setIsActive(true)
      // return "Contact Customer Service"
    } else if (weight >= 6 && weight <= 11.99) {
      if (babyMonth <= 2 && babyMonth >= 0) {
        getProduct('our-newborn-gift-bundle')
      } else if (babyMonth > 2) {
        getProduct('diaper-and-wipe-subscription', 'Size 1')
        console.log('Monthly Diaper Bundle with wipes- size 1')
      }
    } else if (weight >= 12 && weight <= 14.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 2')
        console.log('Monthly Diaper Bundle with wipes- size 2')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 3')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 3	')
      }
    } else if (weight >= 15 && weight <= 16.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 3')
        console.log('Monthly Diaper Bundle with wipes- size 3')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 3')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 3	')
      }
    } else if (weight >= 17 && weight <= 19.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 3')
        console.log('Monthly Diaper Bundle with wipes- size 3')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 4')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 4')
      }
    } else if (weight >= 20 && weight <= 24.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 4')
        console.log('Monthly Diaper Bundle with wipes- size 4')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 4')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 4')
      }
    } else if (weight >= 25 && weight <= 30.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 5')
        console.log('Monthly Diaper Bundle with wipes- size 5')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 5')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 5	')
      }
    } else if (weight >= 31 && weight <= 36.99) {
      if (babyMonth <= 28 && babyMonth >= 0) {
        getProduct('diaper-and-wipe-subscription', 'Size 6')
        console.log('Monthly Diaper Bundle with wipes- size 6')
      } else if (babyMonth >= 29) {
        getProduct('our-pull-up-style-diaper-bundle', 'Size 5')
        console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 5')
      }
    } else if (weight >= 37) {
      getProduct('our-pull-up-style-diaper-bundle', 'Size 6', false)
      console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 6')
    } else {
      setIsActive(true)
    }
  }

  const getProduct = async (handle, size = 'Size 1', prenantal = false) => {
    await nacelleClient
      .products({
        handles: [handle],
      })
      .then((response) => {
        if (response && handle == 'our-newborn-gift-bundle') {
          setProduct(response[0])
          setSelectedVariant(response[0].variants[0])
        } else if (response && prenantal) {
          setProduct(response[0])
          setSelectedVariant(response[0].variants[0])
        } else {
          setProduct(response[0])
          const wipes = response[0].variants.filter((obj) => {
            return obj.content.title.includes('Wipes (x4)')
          })

          let variant = wipes.filter((obj) => {
            return obj.content.selectedOptions[0].value.includes(size)
          })

          setSelectedVariant(variant[0])

          // console.log(product, selectedVariant, prenatalProduct, "Product Added", handle)
        }
        setIsActive(true)
      })
  }

  const handleAddItem = async () => {
    console.log(product, selectedVariant, 'ADDED')
    if (product && selectedVariant) {
      const variant = getCartVariant({
        product,
        variant: selectedVariant,
      })

      let sellingPlan = selectedVariant.metafields.find(
        (metafield) => metafield.key === 'sellingPlanAllocations'
      )

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
            quantity: 1,
            attributes: itemAttributes,
          },
        ],
      })

      console.log(cart, userErrors, errors)

      if (cart) {
        console.log('Subscription')
        cartDrawerContext.setShopifyCart(cart)
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(
          cart.lines.reduce((sum, line) => {
            return sum + line.quantity
          }, 0)
        )
      }

      cartDrawerContext.setIsOpen(true)
    }
  }

  return (
    <section
      className="diaper-finder"
      data-background-color={
        content.fields?.backgroundColor
          ? content.fields.backgroundColor.toLowerCase()
          : ''
      }
    >
      <div className="diaper-finder__container container">
        <div className="diaper-finder__content">
          <h6 className="diaper-finder__subheader">
            LET’S PERSONALIZE YOUR EXPERIENCE
          </h6>
          <form
            className="diaper-finder__form"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <span>
              <span>My baby’s name is</span>
              <input
                name="baby-name"
                label="Name"
                onChange={(e) => handleInputChange(e)}
                value={babyName}
                placeholder="/"
              ></input>
            </span>
            <span>
              <div className="diaper-finder__pronoun-text-wrapper">
                <Select
                  styles={customSelectStyles}
                  className="diaper-finder__select"
                  defaultValue={genderOptions[0]}
                  options={genderOptions}
                  closeMenuOnScroll={true}
                  onChange={(e) => onSelectChange(e)}
                />
                <span className="diaper-finder__born-text">
                  {diaperFinderData.gender == 'They' ? 'were' : 'was'} born on{' '}
                </span>
              </div>
              <span className="select-line">
                <DatePicker
                  dateFormat="MM/dd/yy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="MM/DD/YY"
                  closeOnScroll={false}
                />
              </span>
            </span>
            <span className="weight">
              <span>& weighs</span>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="weight"
                  label="Weight"
                  onChange={(e) => handleInputChange(e)}
                  min="0"
                  value={weight}
                  placeholder="0"
                ></input>
                <span className="suffix">lbs</span>
              </div>
            </span>
          </form>
          <div
            className="diaper-finder__cta"
            onClick={() => showDiaperResults()}
          >
            <button className="btn">
              <style jsx>{`
                button {
                  color: ${ctaTextColor};
                  background-color: ${ctaBackgroundColor};
                }
                button:hover {
                  color: ${ctaHoverTextColor};
                  background-color: ${ctaHoverBackgroundColor};
                }
              `}</style>
              Explore Recommendations
            </button>
          </div>
          <div
            className={`diaper-finder__clear ${
              isActive ? 'is-open' : 'hidden'
            }`}
            onClick={() => clearDiaperResults()}
          >
            <span>
              x{`\u00A0`}
              {`\u00A0`}
            </span>
            <span>Clear My Results</span>
          </div>
        </div>
        <div
          className={`diaper-finder__image ${!isActive ? 'is-open' : 'hidden'}`}
        >
          {image?.fields?.file?.url && (
            <div className="diaper-finder__image--desktop">
              <Image
                className=""
                src={`https:${image.fields.file.url}`}
                alt="diaper"
                width={1488}
                height={963}
              />
            </div>
          )}
          {mobileImage.fields?.file?.url && (
            <div className="diaper-finder__image--mobile">
              <Image
                className=""
                src={`https:${mobileImage.fields.file.url}`}
                alt="diaper"
                layout="responsive"
                objectFit="cover"
                width={375}
                height={344}
              />
            </div>
          )}
        </div>
        <div
          className={`diaper-finder__results ${
            isActive ? 'is-open' : 'hidden'
          }`}
        >
          {product && selectedVariant ? (
            <div className="diaper-finder__product">
              <div className="diaper-finder__product--banner">SAVE 7.5%</div>

              <div className="diaper-finder__product--container">
                <div className="diaper-finder__product--content">
                  <div className="diaper-finder__title">
                    {prenatalProduct ? (
                      <span>{babyName}’s Prenatal Essentials</span>
                    ) : (
                      <span>Build {babyName}’s Essentials Box</span>
                    )}
                  </div>
                  <p className="large">{description}</p>
                </div>
                <div className="diaper-finder__product--image">
                  {selectedVariant.content.featuredMedia?.src ? (
                    <Image
                      className=""
                      src={`${selectedVariant.content.featuredMedia.src}`}
                      alt={selectedVariant.content.title}
                      layout="responsive"
                      objectFit="cover"
                      height="132"
                      width="108"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="diaper-finder__product--cta">
                <button
                  className="btn secondary"
                  onClick={() => handleAddItem()}
                >
                  {prenatalProduct ? (
                    <span>Add {babyName}’s Prenatals To Cart</span>
                  ) : (
                    <span>Add {babyName}’s Bundle To Cart</span>
                  )}
                  <span>
                    <LongArrowRight />
                  </span>
                </button>
              </div>
              <div className="diaper-finder__product--delivery">
                <span>COMPLIMENTARY DELIVERY</span>
                <span className="bullet">•</span>
                <span>CANCEL ANY TIME</span>
              </div>
            </div>
          ) : (
            <div className="diaper-finder__product error">
              <p className="large">
                Please feel free to reach out to our team at{' '}
                <Link href="mailto:support@healthybaby.com">
                  (support@healthybaby.com.)
                </Link>{' '}
                We’re always here for you and baby!
              </p>
            </div>
          )}
        </div>
      </div>
      {content.fields.enableBackgroundWave ? (
        <>
          <div className="diaper-finder__detail-desktop">
            <DiaperFinderDetail />
          </div>
          <div className="diaper-finder__detail-mobile">
            <DiaperFinderDetailMobile />
          </div>
        </>
      ) : (
        ''
      )}
    </section>
  )
}

export default DiaperFinder
