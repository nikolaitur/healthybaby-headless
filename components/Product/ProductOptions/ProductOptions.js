import React from 'react'
import { useState, useEffect } from 'react'

import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

const ProductOptions = ( props ) => {

    const { option, diaperAmount } = props

    const [activeOption, setActiveOption] = useState(0)

    const diaperCalculatorContext = useDiaperCalculatorContext()

    const handleOptionChange = (optionName, optionValue = false, index = activeOption) => {
        props.handleOptionChange(optionName, optionValue, index)
        setActiveOption(index)
    }

    return (
        <>
            <div className="product-form__label">
                <span>Choose {option.name}:</span> {option.name == "Size" ? <span className="calculator" onClick={() => diaperCalculatorContext.setIsOpen(true)}>Diaper calculator</span> : ""}
            </div>
            <div className="product-form__items">
                {option.values.map((value, vIndex) => (
                    <button className={`product-form__option ${activeOption == vIndex ? "active" : ""}`} key={vIndex} value={value} onClick={() => handleOptionChange(option.name, value, vIndex)}>
                        {value}
                    </button>
                ))}
            </div>
            {option.name == "Size" && diaperAmount ? (
                <p className="product-form__count">{diaperAmount} Diapers per pack</p>
            ) : ""}
        </>
    )
}

export default ProductOptions
