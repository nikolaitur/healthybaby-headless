import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const DiaperFinderCard = ({ content }) => {
    const { header, subheader, recommendationsText } = content.fields

    const diaperCalculatorContext = useDiaperCalculatorContext()

    console.log(diaperCalculatorContext)

    // let intialValues = {
    //     lifeStage: "conceive",
    //     birthday: "07/01/2022"
    // }

    // const [stage, setStage] = useState(1)
    // const [lifeStage, setLifeStage] = useState(intialValues.lifeStage)
    // const [birthday, setBirthday] = useState(new Date());
    // const [viatminFinderData, setVitaminFinderData] = useState(intialValues);

    // useEffect(() => {}, [stage]);

    // const goToNextStage = (stageNumber, lifeStage = false) => {
    //     setStage(stageNumber)
    //     setLifeStage(lifeStage)
    // }

    // const showVitaminRestult = () => {
    //     console.log(birthday)
    //     goToNextStage(3)
    //     setVitaminFinderData(viatminFinderData => ({
    //         ...viatminFinderData,
    //         lifeStage,
    //         birthday
    //     }))

    //     console.log(viatminFinderData)
    // }

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

    const openDiaperCalculator = () => {
        diaperCalculatorContext.setIsOpen(true)
        console.log(diaperCalculatorContext.isOpen)
    }

    return (
        <div className="diaper-finder-card item">
            <div className="diaper-finder-card__background">
                {/* <Image
                    src={`https:${backgroundImage.fields.file.url}`}
                    alt={header}
                    layout="fill"
                /> */}
            </div>
            <div className="diaper-finder-card__content">
                <div className={`diaper-finder-card__stage`}>
                    <h6 className="diaper-finder-card__subheader">{subheader}</h6>
                    <div className="diaper-finder-card__header">{header}</div>
                    <div className="diaper-finder-card__form">
                        <div className="input-wrapper birthday">
                            <span>Baby’s birthday</span>
                            <DatePicker closeOnScroll={true}  onChange={(date) => setBirthday(date)} placeholderText="MM/DD/YY" />
                        </div>
                        <div className="input-wrapper weight">
                            <span>Baby's weight</span>
                            <input name="weight" label="Weight" onChange={handleInputChange}  value={diaperFinderData.weight}></input>
                            <span className="suffix">lbs</span>
                        </div>
                        <div className="input-wrapper">
                            <button className="btn" onClick={() => openDiaperCalculator()}>
                                <span>{ recommendationsText }</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaperFinderCard
