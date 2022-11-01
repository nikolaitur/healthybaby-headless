import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { getCartVariant } from 'utils/getCartVariant'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useModalContext } from '../../../context/ModalContext'

import DatePicker from "react-datepicker";

import * as Cookies from 'es-cookie'

import "react-datepicker/dist/react-datepicker.css"

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const VitaminFinder = ({ content, refs, index }) => {
    const { header, subheader, description, ctaText1, ctaText2, ctaText3, recommendationsText, addToCartText, backgroundImage, backgroundImageMobile } = {...content.fields}

    let intialValues = {
        lifeStage: "conceive",
        dueDate: "07/01/2022"
    }

    const [, { addToCart }] = useCart()
    const [stage, setStage] = useState(1)
    const [lifeStage, setLifeStage] = useState(intialValues.lifeStage)
    const [dueDate, setDueDate] = useState(new Date());
    const [product, setProduct] = useState(false)
    const [viatminFinderData, setVitaminFinderData] = useState(intialValues);
    const [maxHeight, setMaxHeight] = useState('100%')

    const cartDrawerContext =  useCartDrawerContext()
    const modalContext = useModalContext()

    useEffect(() => {}, [stage]);

    const goToNextStage = (stageNumber, lifeStage = false) => {
        setStage(stageNumber)
        setLifeStage(lifeStage)
        setProduct(false)

        if(lifeStage == "conceive") {
            getResultProduct("our-prenatal-preconception-1st-trimester")
        } else if (lifeStage == "postpartum"){
            getResultProduct("our-prenatal-4th-trimester-postnatal")
        } else {
            setProduct(false)
        }
    }

    const getResultProduct =  async (handle) => {
        let result = await nacelleClient.products({
            handles: [handle]
        })

        if(result) {
            setProduct(result[0])
        }
    }

    const showVitaminRestult = () => {
        goToNextStage(3)
        setVitaminFinderData(viatminFinderData => ({
            ...viatminFinderData,
            lifeStage,
            dueDate
        }))

        const today = new Date();
        const due = new Date(dueDate)

        const differenceInTime = due.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if(differenceInDays < 0) {
            getResultProduct("our-prenatal-4th-trimester-postnatal")
        } else if(differenceInDays > 0 && differenceInDays <= 84) {
            getResultProduct("our-prenatal-3rd-trimester")
        } else if(differenceInDays >= 85 && differenceInDays <= 177) {
            getResultProduct("our-prenatal-2nd-trimester")
        } else if(differenceInDays >= 178) {
            getResultProduct("our-prenatal-preconception-1st-trimester")
        }
    }

    const handleAddItem = async () => {
        let selectedVariant = product.variants[0]

        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        })

        let sellingPlan = selectedVariant.metafields.find((metafield) => metafield.key === 'sellingPlanAllocations')

        let itemAttributes = []

        if(sellingPlan) {
            const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
            const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id

            itemAttributes = [{ key: "_sellingPlan", value: sellingPlanId}]
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
            cartDrawerContext.setShopifyCart(cart)
            cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
            cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
                return sum + line.quantity
            }, 0))
        }

        cartDrawerContext.setIsOpen(true)
    }

    useEffect(() => {
        const handleResize = () => {

            const isDesktop = window.innerWidth > 1440

            if (!isDesktop) {
                setMaxHeight('100%')
                return false
            }

            const validRefs = refs.current.filter(ref => ref)
            const getSurroundingIndexes = [validRefs[index - 1]?.current, validRefs[index + 1]?.current]
            const getSurroundingIndexesHeight = getSurroundingIndexes.reduce((carry, el) => {
                if (el && !el.classList.contains('collection-product-card__image-wrapper--full-width')) {
                    return el.offsetHeight
                }
                return carry
            }, 0)

            if (getSurroundingIndexesHeight) {
                setMaxHeight(getSurroundingIndexesHeight)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])

    return (
        <div className="vitamin-finder item" style={{'maxHeight': maxHeight}}>
            <div className="vitamin-finder__background">
                <div className="vitamin-finder__background--desktop">
                    {backgroundImage?.fields?.file?.url && <Image
                        src={`https:${backgroundImage.fields.file.url}`}
                        alt={header}
                        layout="fill"
                    />}
                </div>
                <div className="vitamin-finder__background--mobile">
                    {backgroundImageMobile?.fields?.file?.url && <Image
                        src={`https:${backgroundImageMobile.fields.file.url}`}
                        alt={header}
                        layout="fill"
                    />}
                </div>
            </div>
            <div className="vitamin-finder__content">
                <div className={`vitamin-finder__stage vitamin-finder__stage--1 ${stage === 1 ? "active" : ""}`}>
                    <h6 className="vitamin-finder__subheader">{subheader}</h6>
                    <div className="vitamin-finder__header">{header}</div>
                    <p className="vitamin-finder__copy large">{description}</p>
                    <button className="btn" onClick={() => goToNextStage(3, "conceive")}>
                        <span>{ ctaText1 }</span>
                    </button>
                    <button className="btn" onClick={() => goToNextStage(2, "pregnant")}>
                        <span>{ ctaText2 }</span>
                    </button>
                    <button className="btn" onClick={() => goToNextStage(3, "postpartum")}>
                        <span>{ ctaText3 }</span>
                    </button>
                </div>
                <div className={`vitamin-finder__stage vitamin-finder__stage--2 ${stage === 2 ? "active" : ""}`}>
                    <h6 className="vitamin-finder__subheader">{subheader}</h6>
                    <div className="vitamin-finder__header">{header}</div>
                    <p className="vitamin-finder__copy large">{description}</p>
                    <DatePicker dateFormat="MM/dd/yy" selected={dueDate} closeOnScroll={false} onChange={(date) => setDueDate(date)} placeholderText="Enter your due date" />
                    <button className="btn secondary" onClick={() => showVitaminRestult()}>
                        <span>{ recommendationsText }</span>
                        <span><LongArrowRight /></span>
                    </button>
                    <button className="vitamin-finder__clear" onClick={() => goToNextStage(1)}>
                        <span>Start Over</span>
                    </button>
                </div>
                <div className={`vitamin-finder__stage vitamin-finder__stage--3 ${stage === 3 ? "active" : ""}`}>
                    {product ? (
                        <>
                            <h6 className="vitamin-finder__subheader">{ product.content.title }</h6>
                            <div className="vitamin-finder__header">Your Optimized Blend</div>
                            <div className="vitamin-finder__image">
                                <Image
                                    src={product.content.featuredMedia.src}
                                    alt={header}
                                    layout="responsive"
                                    objectFit="cover"
                                    height="315"
                                    width="315"
                                />
                            </div>
                            <button className="btn secondary" onClick={() => handleAddItem()}>
                                <span>{ addToCartText }</span>
                                <span><LongArrowRight /></span>
                            </button>
                            <button className="vitamin-finder__clear" onClick={() => goToNextStage(1)}>
                                <span>Start Over</span>
                            </button>
                        </>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

export default VitaminFinder
