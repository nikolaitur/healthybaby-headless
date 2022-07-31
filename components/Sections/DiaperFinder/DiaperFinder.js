import React from 'react'
import { useState, useEffect } from 'react'
import Select, { components } from "react-select";
import Link from 'next/link';
import Image from 'next/image';

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
        birthday: "07/01/2022",
        weight: "1.1"
    }

    const [isActive, setIsActive] = useState(false);
    const [diaperFinderData, setDiaperFinderData] = useState(intialValues);

    const showDiaperResults = () => {
        setIsActive(true)
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
            display: "block",
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

    return (
        <section className="diaper-finder">
            <div className="diaper-finder__container container">
                <div className="diaper-finder__content">
                    <div className="diaper-finder__subheader">
                        LET’S PERSONALIZE YOUR EXPERIENCE
                    </div>
                    <div className="diaper-finder__form">
                        <span>
                            <span>My baby’s name is</span>
                            <input name="name" label="Name" onChange={handleInputChange} value={diaperFinderData.name}></input>
                        </span>
                        <span>                           
                            <Select 
                                defaultMenuIsOpen="true"
                                styles={customSelectStyles} 
                                className="diaper-finder__select" 
                                defaultValue={genderOptions[0]} 
                                options={genderOptions}
                                onChange={(e) => onSelectChange(e)}/>
                            <span className="select-line">
                                <span>{diaperFinderData.gender == "They" ? "were" : "was"} born on </span>
                                <input name="birthday" label="Birthday" onChange={handleInputChange}  value={diaperFinderData.birthday}></input>
                            </span>
                        </span>
                        <span className="weight">
                            <span>& weigh</span>
                            <div className="input-wrapper">
                                <input name="weight" label="Weight" onChange={handleInputChange}  value={diaperFinderData.weight}></input>
                                <span className="suffix">lbs</span>
                            </div>
                        </span>
                    </div>
                    <div className="diaper-finder__cta" onClick={() => showDiaperResults()}>
                        Explore Recommendations
                    </div>
                    <div className={`diaper-finder__clear ${isActive ? "is-open" : "hidden"}`} onClick={() => clearDiaperResults()}>
                        <span>x&nbsp;&nbsp;</span>
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
                            <Link href="/">
                                <>
                                    <span>Customize Asha’s Bundle</span>
                                    <span><LongArrowRight /></span>
                                </>
                            </Link>
                        </div>
                        <div className="diaper-finder__product--delivery">
                            <span>COMPLIMENTARY DELIVERY</span><span className="bullet">•</span><span>CANCEL ANY TIME</span>  
                        </div>
                    </div>
                    <div className="diaper-finder__article">
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
                    </div>
                    <div className="diaper-finder__article">
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
                    </div>
                </div>
            </div>
            <div className="diaper-finder__detail">
                <DiaperFinderDetail />
            </div>
        </section>
    )
}

export default DiaperFinder
