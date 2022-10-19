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

    let intialValues = {
        birthday: new Date(),
        weight: "10"
    }

    const [isActive, setIsActive] = useState(false);
    const [birthday, setBirthday] = useState(new Date());
    const [diaperFinderData, setDiaperFinderData] = useState(intialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // setDiaperFinderData(diaperFinderData => ({
        //     ...diaperFinderData,
        //     birthday,
        //     [name]: value,
        // }))

        let data = {
            birthday: diaperCalculatorContext.diaperCalculatorData.birthday,
            weight: Number(value)
        }

        diaperCalculatorContext.setDiaperCalculatorData(data)

        // diaperCalculatorContext.setDiaperCalculatorData(diaperFinderData)

        console.log(diaperFinderData, "DIAPER")
    };

    const handleDateChange = (date) => {
        setBirthday(date)
        setDiaperFinderData(diaperFinderData => ({
            ...diaperFinderData,
            birthday: date
        }))

        let data = {
            birthday: date,
            weight: diaperCalculatorContext.diaperCalculatorData.weight
        }

        diaperCalculatorContext.setDiaperCalculatorData(data)
    }

    const openDiaperCalculator = () => {
        diaperCalculatorContext.setIsOpen(true)
        // diaperCalculatorContext.setDiaperCalculatorData(diaperFinderData)
        console.log(diaperFinderData, diaperCalculatorContext.isOpen)
    }

    return (
        <div className="diaper-finder-card item">
            <div className="diaper-finder-card__content">
                <div className="diaper-finder-card__stage">
                    <h6 className="diaper-finder-card__subheader">{subheader}</h6>
                    <h5 className="diaper-finder-card__header">{header}</h5>
                    <div className="diaper-finder-card__form">
                        <div className="input-wrapper birthday">
                            <span>{`Baby’s birthday`}</span>
                            <DatePicker closeOnScroll={true} selected={diaperCalculatorContext.diaperCalculatorData.birthday} onChange={(date) => handleDateChange(date)} placeholderText="MM/DD/YY" />
                        </div>
                        <div className="input-wrapper weight">
                            <span>{`Baby's weight`}</span>
                            <div>
                            <input name="weight" label="Weight" onChange={handleInputChange} value={diaperCalculatorContext.diaperCalculatorData.weight} placeholderText="0"></input>
                                <span className="suffix">lbs</span>
                            </div>
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
