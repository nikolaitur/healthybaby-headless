import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const DiaperFinderCard = ({ content }) => {
    const { header, subheader, recommendationsText, addToCartText } = content.fields

    let intialValues = {
        lifeStage: "conceive",
        birthday: "07/01/2022"
    }

    const [stage, setStage] = useState(1)
    const [lifeStage, setLifeStage] = useState(intialValues.lifeStage)
    const [birthday, setBirthday] = useState(new Date());
    const [viatminFinderData, setVitaminFinderData] = useState(intialValues);

    useEffect(() => {}, [stage]);

    const goToNextStage = (stageNumber, lifeStage = false) => {
        setStage(stageNumber)
        setLifeStage(lifeStage)
    }

    const showVitaminRestult = () => {
        console.log(birthday)
        goToNextStage(3)
        setVitaminFinderData(viatminFinderData => ({
            ...viatminFinderData,
            lifeStage,
            birthday
        }))

        console.log(viatminFinderData)
    }

    return (
        <div className="vitamin-finder item">
            <div className="vitamin-finder__background">
                {/* <Image
                    src={`https:${backgroundImage.fields.file.url}`}
                    alt={header}
                    layout="fill"
                /> */}
            </div>
            <div className="vitamin-finder__content">
                <div className={`vitamin-finder__stage vitamin-finder__stage--1 ${stage === 1 ? "active" : ""}`}>
                    <h6 class="vitamin-finder__subheader">{subheader}</h6>
                    <div className="vitamin-finder__header">{header}</div>
                    <DatePicker closeOnScroll={true}  onChange={(date) => setBirthday(date)} placeholderText="Enter your due date" />
                    <button className="btn" onClick={() => showVitaminRestult()}>
                        <span>{ recommendationsText }</span>
                        <span><LongArrowRight /></span>
                    </button>
                </div>
                <div className={`vitamin-finder__stage vitamin-finder__stage--2 ${stage === 2 ? "active" : ""}`}>
                    <h6 class="vitamin-finder__subheader">PRECONCEPTION & TRIMESTER 1</h6>
                    <div className="vitamin-finder__header">Your Optimized Blend</div>
                    <button className="btn secondary">
                        <span>{ addToCartText }</span>
                        <span><LongArrowRight /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DiaperFinderCard
