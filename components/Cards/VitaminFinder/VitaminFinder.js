import React from 'react'
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

import "react-datepicker/dist/react-datepicker.css"

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const VitaminFinder = ({ content }) => {
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

    const cartDrawerContext =  useCartDrawerContext()
    const modalContext = useModalContext()

    useEffect(() => {}, [stage]);

    const goToNextStage = (stageNumber, lifeStage = false) => {
        setStage(stageNumber)
        setLifeStage(lifeStage)
        setProduct(false)
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
        console.log("added")
        let selectedVariant = product.variants[0]

        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        })
        
        let sellingPlan = selectedVariant.metafields.find((metafield) => metafield.key === 'sellingPlanAllocations')

        if(!sellingPlan) {
            sellingPlan = false
        } 

        addToCart({
            product,
            variant,
            quantity: 1,
            sellingPlan,
            subscription: false,
            nacelleEntryId: selectedVariant.nacelleEntryId,
            selectedVariant
        })

        console.log(cartDrawerContext.shopifyCartId)

        await cartClient.cartLinesAdd({
            cartId: cartDrawerContext.shopifyCartId,
            lines: [
              {
                merchandiseId: selectedVariant.nacelleEntryId,
                nacelleEntryId: selectedVariant.nacelleEntryId,
                quantity: 1,
              }
            ]
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.error(err, "Error")
          })
        
          cartDrawerContext.setIsOpen(true)
    }

    return (
        <div className="vitamin-finder item">
            <div className="vitamin-finder__background">
                <div className="vitamin-finder__background--desktop">
                    <Image
                        src={`https:${backgroundImage.fields.file.url}`}
                        alt={header}
                        layout="fill"
                    />
                </div>
                <div className="vitamin-finder__background--mobile">
                    <Image
                        src={`https:${backgroundImageMobile.fields.file.url}`}
                        alt={header}
                        layout="fill"
                    />
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
                    <button className="btn" onClick={() => goToNextStage(2, "postpartum")}>
                        <span>{ ctaText3 }</span>
                    </button>
                </div>
                <div className={`vitamin-finder__stage vitamin-finder__stage--2 ${stage === 2 ? "active" : ""}`}>
                    <h6 className="vitamin-finder__subheader">{subheader}</h6>
                    <div className="vitamin-finder__header">{header}</div>
                    <p className="vitamin-finder__copy large">{description}</p>
                    <DatePicker closeOnScroll={true} selected={dueDate}  onChange={(date) => setDueDate(date)} placeholderText="Enter your due date" />
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
