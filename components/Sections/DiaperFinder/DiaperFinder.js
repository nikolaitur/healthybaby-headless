import React from 'react'
import { useState, useEffect } from 'react'
import Select, { components } from "react-select";
import { nacelleClient } from 'services'
import cartClient from '../../../services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'
import Image from 'next/image';
import DatePicker from "react-datepicker";

import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import "react-datepicker/dist/react-datepicker.css"

import LongArrowRight from '../../../svgs/long-arrow-right.svg'
import CheckCircle from '../../../svgs/check-circle.svg'
import DiaperFinderDetail from '../../../svgs/diaper-finder-detail.svg'

const DiaperFinder = ({ content }) => {
    const image = content.fields.image.fields.file.url
    const genderOptions = [
        { value: "He", label: "He" },
        { value: "She", label: "She" },
        { value: "They", label: "They" },
    ];

    let intialValues = {
        name: "/",
        gender: genderOptions[0],
        birthday: null,
        weight: "1.1"
    }

    const [, { addToCart }] = useCart()
    const [isActive, setIsActive] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [diaperFinderData, setDiaperFinderData] = useState(intialValues);
    const [weight, setWeight] = useState(1.1)
    const [product, setProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(false);

    const cartDrawerContext =  useCartDrawerContext()

    const showDiaperResults = () => {
        setIsActive(true)
        getProductRecommendation()
    }

    const clearDiaperResults = () => {
        setIsActive(false)
        setDiaperFinderData(intialValues)
    }

    const customSelectStyles = {
        control: () => ({
          background: "transparent",
          width: "auto",
        }),
        indicatorsContainer: () => ({
            display: "none"
        }),
        input: () => ({
            margin: "2px",
            paddingBottom: "2px",
            paddingTop: "2px",
            visibility: "visible",
            color: "#4161A5",
            flex: "1 1 auto",
            display: "inline-grid",
            gridArea: "1/1/2/3",
            gridTemplateColumns: "0 min-content",
            borderBottom: "1px dashed #4161A5",
            cursor: "pointer"
        }),
        singleValue: () => ({
            color: "#4161A5",
            gridArea: "1/1/2/3",
            margin: "0 2px",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "pointer"
        }),
        menu: () => ({
            position: "absolute",
            background: "#A0B0D2",
            width: "290px",
            padding: "24px 20px"
        }),
        option: () => ({
            fontFamily: "DomaineText",
            fontStyle: "italic",
            fontWeight: "500",
            color: "#fff",
            padding: "7px 0",
            cursor: "pointer"
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setWeight(Number(value))

        console.log(value)

        setDiaperFinderData(diaperFinderData => ({
            ...diaperFinderData,
            [name]: value,
        }))
    };

    const onSelectChange = (selectedOption) => {
        let gender = selectedOption.value
        setDiaperFinderData(diaperFinderData => ({
            ...diaperFinderData,
            gender: gender
        }))
    }


    const getMonthDifference = (startDate, endDate) => {
        return (
          endDate.getMonth() -
          startDate.getMonth() +
          12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    const getProductRecommendation = () => {
        let today = new Date()
        let babyMonth = getMonthDifference(startDate, today)
        console.log(getMonthDifference(startDate, today))

        if(babyMonth < 0) {
            return "Prenantal Logic"
        }
        
        if(weight < 6) {
            if(babyMonth > 0) {
                console.log("Contact Customer Service")
                return "Contact Customer Service"
            } 
        } else if(weight > 6 && weight < 11) {
            if(babyMonth < 2 && babyMonth > 0) {
                getProduct("our-newborn-gift-bundle")
            } else if(babyMonth > 2) {
                console.log("Monthly Diaper Bundle with wipes- size 1")
            }
        } else if(weight > 12 && weight < 14) {
            if(babyMonth < 29 && babyMonth > 0) {
                console.log("Monthly Diaper Bundle with wipes- size 2")
            } else if(babyMonth > 29) {
                console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 3	")
            }
        } else if(weight > 15 && weight < 16) {
            console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 3	")
        } else if(weight > 17 && weight < 19) {
            if(babyMonth < 29 && babyMonth > 0) {
                console.log("Monthly Diaper Bundle with wipes- size 3")
            } else if(babyMonth > 29) {
                console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 4")
            }
        } else if(weight > 20 && weight < 24) {
            if(babyMonth < 29 && babyMonth > 0) {
                console.log("Monthly Diaper Bundle with wipes- size 4")
            } else if(babyMonth > 29) {
                console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 4")
            }
        } else if(weight > 25 && weight < 30) {
            if(babyMonth < 29 && babyMonth > 0) {
                console.log("Monthly Diaper Bundle with wipes- size 5")
            } else if(babyMonth > 29) {
                console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 5	")
            }
        } else if(weight > 31 && weight < 36) {
            if(babyMonth < 29 && babyMonth > 0) {
                console.log("Monthly Diaper Bundle with wipes- size 6")
            } else if(babyMonth > 29) {
                console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 5")
            }
        } else if(weight > 37) {
            console.log("Monthly Pull-Up Style Diaper Bundle with wipes- size 6")
        }
    }

    const getProduct = async (handle, size = 1) => {
        await nacelleClient.products({
            handles: [handle]
        }).then(response => {
            if(response && handle == "our-newborn-gift-bundle") {
                setProduct(response[0])
                setSelectedVariant(response[0].variants[0])
                console.log(product, selectedVariant)
            } else if (response) {
                setProduct(response[0])
            }
        });
    }

    const handleAddItem = async () => {
        console.log(product, selectedVariant, "ADDED")
        if(product && selectedVariant) {
            
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
    }

    return (
        <section className="diaper-finder" data-background-color="blue">
            <div className="diaper-finder__container container">
                <div className="diaper-finder__content">
                    <h6 className="diaper-finder__subheader">
                        LET’S PERSONALIZE YOUR EXPERIENCE
                    </h6>
                    <div className="diaper-finder__form">
                        <span>
                            <span>My baby’s name is</span>
                            <input name="name" label="Name" onChange={handleInputChange} value={diaperFinderData.name}></input>
                        </span>
                        <span>                           
                            <Select 
                                styles={customSelectStyles} 
                                className="diaper-finder__select" 
                                defaultValue={genderOptions[0]} 
                                options={genderOptions}
                                onChange={(e) => onSelectChange(e)}/>
                            <span className="select-line">
                                <span>{diaperFinderData.gender == "They" ? "were" : "was"} born on </span>
                                {/* <input name="birthday" label="Birthday" onChange={handleInputChange}  value={diaperFinderData.birthday}></input> */}
                                <DatePicker closeOnScroll={true} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </span>
                        </span>
                        <span className="weight">
                            <span>& weigh</span>
                            <div className="input-wrapper">
                                <input name="weight" label="Weight" onChange={(e) => handleInputChange(e)}  value={weight}></input>
                                <span className="suffix">lbs</span>
                            </div>
                        </span>
                    </div>
                    <div className="diaper-finder__cta" onClick={() => showDiaperResults()}>
                        <button className="btn">Explore Recommendations</button>
                    </div>
                    <div className={`diaper-finder__clear ${isActive ? "is-open" : "hidden"}`} onClick={() => clearDiaperResults()}>
                        <span>x{`\u00A0`}{`\u00A0`}</span>
                        <span>Clear My Results</span>
                    </div>
                </div>
                <div className={`diaper-finder__image ${!isActive ? "is-open" : "hidden"}`}>
                    <Image
                        className="diaper-finder__image--desktop"
                        src={`https:${image}`}
                        alt="diaper"
                        width={1488}
                        height={963}
                    />
                    {/* <Image
                        className="diaper-finder__image--mobile"
                        src={`https:${mobileImage}`}
                        alt="diaper"
                        width={375}
                        height={344}
                    /> */}
                </div>
                <div className={`diaper-finder__results ${isActive ? "is-open" : "hidden"}`}>
                    <div className="diaper-finder__product">
                        <div className="diaper-finder__product--banner">
                            SAVE UP TO<br/> 30%
                        </div>
                        <div className="diaper-finder__product--container">
                            <div className="diaper-finder__product--image">
                            </div>
                            <div className="diaper-finder__product--content">
                                <div className="diaper-finder__title">
                                    Build Asha’s Essentials Box
                                </div>
                                <ul className="diaper-finder__product--bullets">
                                    <li><span><CheckCircle /></span><span>Our Diapers x4:  Size 3</span></li>
                                    <li><span><CheckCircle /></span><span>Our Diapers x4:  Size 3</span></li>
                                    <li><span><CheckCircle /></span><span>Our Diapers x4:  Size 3</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="diaper-finder__product--cta">
                            <button className="btn" onClick={() => handleAddItem()}>
                                <span>Customize Asha’s Bundle</span>
                                <span><LongArrowRight /></span>
                            </button>
                        </div>
                        <div className="diaper-finder__product--delivery">
                            <span>COMPLIMENTARY DELIVERY</span><span className="bullet">•</span><span>CANCEL ANY TIME</span>  
                        </div>
                    </div>
                    {/* <div className="diaper-finder__article">
                        <div className="diaper-finder__title">
                            Build Asha’s Essentials Box
                        </div>
                        <div className="diaper-finder__copy">
                            Asha’s brain is making 1 million neural connections per second!
                        </div>
                        <div className="diaper-finder__link">
                            <Link href="/">
                                <>
                                    <span>3-6 Mo. Activities</span>
                                    <span><LongArrowRight /></span>
                                </>
                            </Link>
                        </div>
                    </div> */}
                    {/* <div className="diaper-finder__article">
                        <div className="diaper-finder__title">
                            Build Asha’s Essentials Box
                        </div>
                        <div className="diaper-finder__copy">
                            Asha’s brain is making 1 million neural connections per second!
                        </div>
                        <div className="diaper-finder__link">
                            <Link href="/">
                                <>
                                    <span>3-6 Mo. Activities</span>
                                    <span><LongArrowRight /></span>
                                </>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="diaper-finder__detail">
                <DiaperFinderDetail />
            </div>
        </section>
    )
}

export default DiaperFinder
