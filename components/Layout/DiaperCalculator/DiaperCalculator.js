import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import cartClient from '../../../services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'
import Link from 'next/link'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { unlockScroll } from '@/utils/scroll'

const DiaperCalculator = ({ props, children }) => {
  let intialValues = {
    birthday: new Date(),
    weight: '1.1',
  }

  const [, { addToCart }] = useCart()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(false)
  const [isActive, setIsActive] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [diaperSize, setDiaperSize] = useState(1)
  const [weight, setWeight] = useState(0)
  const [measurement, setMeasurement] = useState('lbs')
  const [diaperFinderData, setDiaperFinderData] = useState(intialValues)

  const cartDrawerContext = useCartDrawerContext()
  const diaperCalculatorContext = useDiaperCalculatorContext()

  const getMonthDifference = (startDate, endDate) => {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    )
  }

  useEffect(() => {
    if (diaperCalculatorContext.isOpen) {
      setWeight(Number(diaperCalculatorContext.diaperCalculatorData.weight))
    }

    const getProduct = async () => {
      await nacelleClient
        .products({
          handles: ['diaper-and-wipe-subscription'],
        })
        .then((response) => {
          setProduct(response[0])
        })
    }

    getProduct()
  }, [])

  useEffect(() => {
    const recommendProduct = () => {
      if (diaperCalculatorContext.isOpen) {
        if (!diaperCalculatorContext.diaperCalculatorData.birthday) {
            setIsActive(false)
            return false;
        }

        let today = new Date()
        let babyMonth = getMonthDifference(diaperCalculatorContext.diaperCalculatorData.birthday, today)
        console.log(getMonthDifference(diaperCalculatorContext.diaperCalculatorData.birthday, today), Number(weight), 'Weight')

        if (weight < 6) {
            console.log('Contact Customer Service')
            setIsActive(false)
        } else if (weight >= 6 && weight <= 11.99) {
            getProduct('diaper-and-wipe-subscription', 'Size 1')
            setDiaperSize(1)
            console.log('Monthly Diaper Bundle with wipes- size 1')
        } else if (weight >= 12 && weight <= 14.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 2')
              setDiaperSize(2)
              console.log('Monthly Diaper Bundle with wipes- size 2')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 3')
              setDiaperSize(3)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 3')
            }
        } else if (weight >= 15 && weight <= 16.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 3')
              setDiaperSize(3)
              console.log('Monthly Diaper Bundle with wipes- size 3')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 3')
              setDiaperSize(3)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 3	')
            }
        } else if (weight >= 17 && weight <= 19.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 3')
              setDiaperSize(3)
              console.log('Monthly Diaper Bundle with wipes- size 3')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 4')
              setDiaperSize(4)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 4')
            }
        } else if (weight >= 20 && weight <= 24.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 4')
              setDiaperSize(4)
              console.log('Monthly Diaper Bundle with wipes- size 4')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 4')
              setDiaperSize(4)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 4')
            }
        } else if (weight >= 25 && weight <= 30.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 5')
              setDiaperSize(5)
              console.log('Monthly Diaper Bundle with wipes- size 5')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 5')
              setDiaperSize(5)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 5	')
            }
        } else if (weight >= 31 && weight <= 36.99) {
            if (babyMonth <= 28 && babyMonth >= 0) {
              getProduct('diaper-and-wipe-subscription', 'Size 6')
              setDiaperSize(6)
              console.log('Monthly Diaper Bundle with wipes- size 6')
            } else if (babyMonth >= 29) {
              getProduct('our-pull-up-style-diaper-bundle', 'Size 5')
              setDiaperSize(5)
              console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 5')
            }
        } else if (weight >= 37) {
            getProduct('our-pull-up-style-diaper-bundle', 'Size 6', false)
            setDiaperSize(6)
            console.log('Monthly Pull-Up Style Diaper Bundle with wipes- size 6')
        } 

        let data = {
          birthday: diaperCalculatorContext.diaperCalculatorData.birthday,
          weight,
        }

        diaperCalculatorContext.setDiaperCalculatorData(data)
      }
    }

    recommendProduct()
  }, [weight, diaperSize, diaperCalculatorContext.diaperCalculatorData.birthday])
  
  const getProduct = async (handle, size = 'Size 1') => {
    await nacelleClient
      .products({
        handles: [handle],
      })
      .then((response) => {
        if (response && handle) {
          setProduct(response[0])
          const wipes = response[0].variants.filter((obj) => {
            return obj.content.title.includes('Wipes (x4)')
          })

          let variant = wipes.filter((obj) => {
            return obj.content.selectedOptions[0].value.includes(size)
          })

          setSelectedVariant(variant)
          setIsActive(true)
        }
      })
  }

  const sizeGuideData = [
    {
      size: '1',
      lbs: '6 — 12',
      kgs: '2.72 - 5.44',
      perBag: 42,
    },
    {
      size: '2',
      lbs: '10 — 16',
      kgs: '4.53 - 7.25',
      perBag: 42,
    },
    {
      size: '3',
      lbs: '12 — 22',
      kgs: '5.44 - 9.97',
      perBag: 40,
    },
    {
      size: '4',
      lbs: '18 — 30',
      kgs: '8.16 - 13.60',
      perBag: 32,
    },
    {
      size: '5',
      lbs: '22 — 37',
      kgs: '9.97 — 16.78',
      perBag: 32,
    },
    {
      size: '6',
      lbs: '37+',
      kgs: '16.78+',
      perBag: 30,
    },
  ]

  const handleDateChange = (date) => {
    let data = {
      birthday: date,
      weight: diaperCalculatorContext.diaperCalculatorData.weight,
    }

    diaperCalculatorContext.setDiaperCalculatorData(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (isNaN(value)) {
      setWeight(0)
    } else {
      setWeight(Number(value))
    }

    let data = {
      birthday: diaperCalculatorContext.diaperCalculatorData.birthday,
      weight: value,
    }

    diaperCalculatorContext.setDiaperCalculatorData(data)
  }

//   const toggleMeasurement = (e) => {
//     setMeasurement(e)
//   }

  const closeSlide = () => {
    unlockScroll()
    diaperCalculatorContext.setIsOpen(false)

  }

  const handleAddItem = async () => {
    console.log(product, selectedVariant)
    // const noWipes = product.variants.filter((obj) => {
    //   return obj.content.title.includes('No Wipes')
    // })

    // const selectedVariant = noWipes.filter((obj) => {
    //   return obj.content.selectedOptions[0].value.includes(`Size ${diaperSize}`)
    // })
    
    if (product && selectedVariant) {

        const variant = getCartVariant({
            product,
            variant: selectedVariant[0],
        })

        let sellingPlan = selectedVariant[0].metafields.find(
            (metafield) => metafield.key === 'sellingPlanAllocations'
        )

        let lineItem = {
            merchandiseId: selectedVariant[0].nacelleEntryId,
            nacelleEntryId: selectedVariant[0].nacelleEntryId,
            quantity: 1,
        }

        if (!sellingPlan) {
            sellingPlan = false
        } else {
            const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
            const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id

            lineItem = {
                merchandiseId: selectedVariant[0].nacelleEntryId,
                nacelleEntryId: selectedVariant[0].nacelleEntryId,
                quantity: 1,
                sellingPlanId,
                attributes: [{ key: 'subscription', value: sellingPlanId }],
            }
        }

        // addToCart({
        //     product,
        //     variant,
        //     quantity: 1,
        //     sellingPlan,
        //     subscription: true,
        //     nacelleEntryId: selectedVariant[0].nacelleEntryId,
        //     selectedVariant: selectedVariant[0],
        // })

        await cartClient
            .cartLinesAdd({
                cartId: cartDrawerContext.shopifyCartId,
                lines: [lineItem],
            })
            .then((data) => {
                console.log(data, 'Cart data')
            })
            .catch((err) => {
                console.error(err, 'Error')
            })

        cartDrawerContext.setIsOpen(true)
    }
  }

  return (
    <div
      className={`diaper-calculator ${
        diaperCalculatorContext.isOpen ? 'active' : ''
      }`}
    >
      <div
        className="diaper-calculator__overlay"
        onClick={() => closeSlide()}
      ></div>
      <div className={`diaper-calculator__container`}>
        <div className="diaper-calculator__content">
          <div
            className="diaper-calculator__close"
            onClick={() => closeSlide()}
          >
            <IconClose />
          </div>
          <h6 className="diaper-calculator__subheader">NEED SIZING HELP?</h6>
          <div className="diaper-calculator__header">{`Size matters. We're here to help find the perfect fit for your baby's size & stage.`}</div>
          <div className="diaper-calculator__form">
            <div className="input-wrapper">
              <span>{`Baby’s birthday`}</span>
              <DatePicker
                dateFormat="MM/dd/yy"
                placeholderText="00/00/00"
                closeOnScroll={false}
                onChange={(date) => handleDateChange(date)}
                selected={diaperCalculatorContext.diaperCalculatorData.birthday}
              />
            </div>
            <div className="input-wrapper weight">
              <span>{`Baby's weight`}</span>
              <input
                name="weight"
                label="Weight"
                onChange={(e) => handleInputChange(e)}
                value={diaperCalculatorContext.diaperCalculatorData.weight}
              ></input>
              <span className="suffix">lbs</span>
            </div>
            <p className="diaper-calculator__copy">
              We recommend our Monthly Diaper Membership in the following size:
            </p>
            <div className="diaper-calculator__recommendation">
              <span className="circle">{diaperSize}</span>
              <span className="size">Size {diaperSize}</span>
              <span className="weight">
                {sizeGuideData[diaperSize - 1].lbs}lbs
              </span>
            </div>
            {!isActive && isActive !== null ? (
                <p className="diaper-calculator__error">
                    Please feel free to reach out to our team at{' '}
                    <Link href="mailto:support@healthybaby.com">
                    (support@healthybaby.com.)
                    </Link>{' '}
                    <br/>
                    We’re always here for you and baby!
                </p>
            ) : ""}
            <div className="input-wrapper">
              <button
                className={`btn secondary full-width ${!isActive && isActive !== null ? "disabled" : ""}`}
                onClick={handleAddItem}
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
          <div className="diaper-calculator__select">
            <span className="title">Size Guide: </span>
            <div className="toggle">
              <span
                className={`${measurement == 'lbs' ? 'active' : ''}`}
                onClick={() => toggleMeasurement('lbs')}
              >
                lbs
              </span>
              {/* <span className={`${measurement == "kgs" ? "active" : ""}`} onClick={() => toggleMeasurement("kgs")}>kgs</span> */}
            </div>
          </div>
          <div className="diaper-calculator__size-guide">
            <div className="diaper-calculator__size-guide--header">
              <span>Size</span>
              <span>Weight (lbs)</span>
              <span>Per bag</span>
            </div>
            {sizeGuideData.map((item, index) => (
              <div className="diaper-calculator__size-guide--cell" key={index}>
                <span>{item.size}</span>
                <span>{`${measurement == 'lbs' ? item.lbs : item.kgs}`}</span>
                <span>{item.perBag}</span>
              </div>
            ))}
          </div>
          <p className="diaper-calculator__contact">
            If you have questions, feel free to reach out to our team at
            support@healthybaby.com. We’re always here for you and baby!
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiaperCalculator
