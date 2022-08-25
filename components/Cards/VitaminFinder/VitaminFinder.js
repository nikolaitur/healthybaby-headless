import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const VitaminFinder = ({ content }) => {
    const { header, subheader, description, ctaText1, ctaText2, ctaText3, recommendationsText, addToCartText, backgroundImage } = content.fields

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
                <Image
                    src={`https:${backgroundImage.fields.file.url}`}
                    alt={header}
                    layout="fill"
                />
            </div>
            <div className="vitamin-finder__content">
                <div className={`vitamin-finder__stage vitamin-finder__stage--1 ${stage === 1 ? "active" : ""}`}>
                    <h6 className="vitamin-finder__subheader">{subheader}</h6>
                    <div className="vitamin-finder__header">{header}</div>
                    <p className="vitamin-finder__copy large">{description}</p>
                    <button className="btn" onClick={() => goToNextStage(2, "conceive")}>
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
                    <DatePicker closeOnScroll={true}  onChange={(date) => setBirthday(date)} placeholderText="Enter your due date" />
                    <button className="btn secondary" onClick={() => showVitaminRestult()}>
                        <span>{ recommendationsText }</span>
                        <span><LongArrowRight /></span>
                    </button>
                    <button className="vitamin-finder__clear" onClick={() => goToNextStage(1)}>
                        <span>Start Over</span>
                    </button>
                </div>
                <div className={`vitamin-finder__stage vitamin-finder__stage--3 ${stage === 3 ? "active" : ""}`}>
                    <h6 className="vitamin-finder__subheader">PRECONCEPTION & TRIMESTER 1</h6>
                    <div className="vitamin-finder__header">Your Optimized Blend</div>
                    <div className="vitamin-finder__image">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/2kfkhrxpdozOPP2dhPysYQ/f2743ef8a575229986a7f19032b70ee8/image_70.png?h=315`}
                            alt={header}
                            height="315"
                            width="315"
                        />
                    </div>  
                    <button className="btn secondary">
                        <span>{ addToCartText }</span>
                        <span><LongArrowRight /></span>
                    </button>
                    <button className="vitamin-finder__clear" onClick={() => goToNextStage(1)}>
                        <span>Start Over</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VitaminFinder
