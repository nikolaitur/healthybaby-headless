import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useCart } from '@nacelle/react-hooks'
import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'
import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const DiaperCalculator = ({props, children}) => {

    let intialValues = {
        birthday: new Date(),
        weight: "1.1"
    }

    const [, { addToCart }] = useCart()
    const [product, setProduct] = useState(null)
    const [birthday, setBirthday] = useState(null);
    const [diaperSize, setDiaperSize] = useState(1);
    const [measurement, setMeasurement] = useState("lbs");
    const [diaperFinderData, setDiaperFinderData] = useState(intialValues);
    
    const diaperCalculatorContext =  useDiaperCalculatorContext()
    const weight = diaperCalculatorContext.diaperCalculatorData.weight

    useEffect(() => {
        const recommendProduct = () => {
            if(diaperCalculatorContext.isOpen) {
                if(weight < 10) {
                    // console.log("size 1")
                    setDiaperSize(1)
                } else if(weight > 10 && weight < 12) {
                    // console.log("size 2")
                    setDiaperSize(2)
                } else if(weight > 12 && weight < 18) {
                    // console.log("size 3")
                    setDiaperSize(3)
                } else if(weight > 18 && weight < 22) {
                    // console.log("size 4")
                    setDiaperSize(4)
                } else if(weight > 22 && weight < 27) {
                    // console.log("size 5")
                    setDiaperSize(5)
                } else {
                    // console.log("size 6")
                    setDiaperSize(6)
                }
        
                console.log(weight)
            }
    
        }
    
        recommendProduct()
        if(diaperCalculatorContext.isOpen) {
            const getProduct = async () => {
                await nacelleClient.products({
                    handles: ["our-diaper-1-pack"]
                }).then(response => {
                    console.log(response[0])
                    setProduct(response[0])
                    const noWipes = response[0].variants.filter(obj => {
                        return obj.content.title.includes("No Wipes");
                    });
                });
            }
        
            getProduct()
        }

    }, [weight, diaperSize])

    const sizeGuideData = [
        {
            size: "1",
            lbs: "6 — 12",
            kgs: "2.72 - 5.44",
            perBag: 42
        },
        {
            size: "2",
            lbs: "10 — 16",
            kgs: "4.53 - 7.25",
            perBag: 42
        },
        {
            size: "3",
            lbs: "12 — 22",
            kgs: "5.44 - 9.97",
            perBag: 40
        },
        {
            size: "4",
            lbs: "18 — 30",
            kgs: "8.16 - 13.60",
            perBag: 32
        },
        {
            size: "5",
            lbs: "22 — 37",
            kgs: "9.97 — 16.78",
            perBag: 32
        },
        {
            size: "6",
            lbs: "37+",
            kgs: "16.78+",
            perBag: 30
        }
    ]

    const handleInputChange = (e) => {
    const { name, value } = e.target;

        // setDiaperFinderData(diaperFinderData => ({
        //     ...diaperFinderData,
        //     [name]: value,

        // }))
    };

    const toggleMeasurement = (e) => {
        setMeasurement(e)
    }

    const closeSlide = () => {
        diaperCalculatorContext.setIsOpen(false)
    }

    const handleAddItem = () => {
        // const variant = getCartVariant({
        //   product,
        //   variant: selectedVariant,
        // })
        // addToCart({
        //   variant,
        //   quantity,
        // })
      }

    return (
        <div className={`diaper-calculator ${diaperCalculatorContext.isOpen ? "active" : ""}`}>
            <div className="diaper-calculator__overlay" onClick={() => closeSlide()}></div>
            <div className={`diaper-calculator__container`}>
                <div className="diaper-calculator__content">
                    <div className="diaper-calculator__close" onClick={() => closeSlide()}>
                        <IconClose />
                    </div>
                    <h6 className="diaper-calculator__subheader">NEED SIZING HELP?</h6>
                    <div className="diaper-calculator__header">{`Size matters. We're here to help find the perfect fit for your baby's size & stage.`}</div>
                    <div className="diaper-calculator__form">
                        <div className="input-wrapper">
                            <span>{`Baby’s birthday`}</span>
                            <DatePicker closeOnScroll={true}  onChange={(date) => setBirthday(date)} selected={diaperCalculatorContext.diaperCalculatorData.birthday} />
                        </div>
                        <div className="input-wrapper weight">
                            <span>{`Baby's weight`}</span>
                            <input name="weight" label="Weight" onChange={handleInputChange}  value={diaperCalculatorContext.diaperCalculatorData.weight}></input>
                            <span className="suffix">lbs</span>
                        </div>
                        <p className="diaper-calculator__copy">
                            We recommend our Monthly Diaper Membership in the following size: 
                        </p>
                        <div className="diaper-calculator__recommendation">
                            <span className="circle">{diaperSize}</span>
                            <span className="size">Size {diaperSize}</span>
                            <span className="weight">{sizeGuideData[diaperSize - 1].lbs}lbs</span>
                        </div>
                        <div className="input-wrapper">
                            <button className="btn secondary full-width" onClick={handleAddItem}>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="diaper-calculator__select">
                        <span className="title">Size: </span>
                        <div className="toggle">
                            <span className={`${measurement == "lbs" ? "active" : ""}`} onClick={() => toggleMeasurement("lbs")}>lbs</span>
                            <span className={`${measurement == "kgs" ? "active" : ""}`} onClick={() => toggleMeasurement("kgs")}>kgs</span>
                        </div>
                    </div>
                    <div className="diaper-calculator__size-guide">
                        
                        <div className='diaper-calculator__size-guide--header'>
                            <span>Size</span>
                            <span>Weight (lbs)</span>
                            <span>Per bag</span>
                        </div>
                        {sizeGuideData.map((item, index) => (
                            <div className="diaper-calculator__size-guide--cell" key={index}>
                                <span>{item.size}</span>
                                <span>{`${measurement == "lbs" ? item.lbs : item.kgs}`}</span>
                                <span>{item.perBag}</span>
                            </div>
                        ))}
                    </div>
                    <p className="diaper-calculator__contact">
                        If you have questions, feel free to reach out to our team at support@healthybaby.com. We’re always here for you and baby!
                    </p>
                </div>   
            </div>
        </div>
    )
}

export default DiaperCalculator