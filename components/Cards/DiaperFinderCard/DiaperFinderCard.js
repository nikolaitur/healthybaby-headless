import { useState, useEffect } from 'react'

import { unlockScroll, lockScroll } from '@/utils/scroll'

import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const DiaperFinderCard = ({ content, refs, index }) => {
    const { header, subheader, recommendationsText } = content.fields

    const diaperCalculatorContext = useDiaperCalculatorContext()

    const [maxHeight, setMaxHeight] = useState('100%')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let data = {
            birthday: diaperCalculatorContext.diaperCalculatorData.birthday,
            weight: Number(value)
        }
        diaperCalculatorContext.setDiaperCalculatorData(data)
    };

    const handleDateChange = (date) => {
        let data = {
            birthday: date,
            weight: diaperCalculatorContext.diaperCalculatorData.weight
        }
        diaperCalculatorContext.setDiaperCalculatorData(data)
    }

    const openDiaperCalculator = () => {
        lockScroll()
        diaperCalculatorContext.setIsOpen(true)
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
        <div className="diaper-finder-card item" style={{'maxHeight': maxHeight}}>
            <div className="diaper-finder-card__content">
                <div className="diaper-finder-card__stage">
                    <h6 className="diaper-finder-card__subheader">{subheader}</h6>
                    <h5 className="diaper-finder-card__header">{header}</h5>
                    <div className="diaper-finder-card__form">
                        <div className="input-wrapper birthday">
                            <span>{`Baby’s birthday`}</span>
                            <DatePicker dateFormat="MM/dd/yy" closeOnScroll={false} selected={diaperCalculatorContext.diaperCalculatorData.birthday} onChange={(date) => handleDateChange(date)} placeholderText="MM/DD/YY" />
                        </div>
                        <div className="input-wrapper weight">
                            <span>{`Baby’s weight`}</span>
                            <div>
                            <input name="weight"
                                label="Weight"
                                onChange={handleInputChange}
                                value={diaperCalculatorContext.diaperCalculatorData.weight !== 0 ? diaperCalculatorContext.diaperCalculatorData.weight : ''}
                                placeholder="0"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault()
                                    }
                                }}
                            />
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
            <div style={{'marginTop': 'auto'}}></div>
        </div>
    )
}

export default DiaperFinderCard
