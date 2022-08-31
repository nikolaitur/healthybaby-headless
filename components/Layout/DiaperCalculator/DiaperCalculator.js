import { useState, useEffect } from 'react'
import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'
import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const DiaperCalculator = ({props, children}) => {

    const diaperCalculatorContext =  useDiaperCalculatorContext()

    let intialValues = {
        birthday: "07/01/2022",
        weight: "1.1"
    }

    const [isActive, setIsActive] = useState(false);
    const [birthday, setBirthday] = useState(new Date());
    const [diaperFinderData, setDiaperFinderData] = useState(intialValues);

    const handleInputChange = (e) => {
    const { name, value } = e.target;

        // setDiaperFinderData(diaperFinderData => ({
        //     ...diaperFinderData,
        //     [name]: value,

        // }))
    };

    const closeSlide = () => {
        diaperCalculatorContext.setIsOpen(false)
    }

    return (
        <div className={`diaper-calculator ${diaperCalculatorContext.isOpen ? "active" : ""}`}>
            <div className="diaper-calculator__overlay"></div>
            <div className={`diaper-calculator__container`}>
                <div className="diaper-calculator__content">
                    <div className="diaper-calculator__close" onClick={() => closeSlide()}>
                        <IconClose />
                    </div>
                    <h6 className="diaper-calculator__subheader">NEED SIZING HELP?</h6>
                    <div className="diaper-calculator__header">Size matters. We're here to help find the perfect fit for your baby's size & stage.</div>
                    {/* <div className="diaper-calculator__form">
                        <div className="input-wrapper">
                            <DatePicker closeOnScroll={true}  onChange={(date) => setBirthday(date)} placeholderText="Enter your due date" />
                        </div>
                        <div className="input-wrapper">
                            <input name="weight" label="Weight" onChange={handleInputChange}  value={diaperFinderData.weight}></input>
                            <span className="suffix">lbs</span>
                        </div>
                    </div> */}
                    <div className="diaper-calculator__size-guide">

                    </div>
                </div>   
            </div>
        </div>
    )
}

export default DiaperCalculator