import React from 'react'
import { useState, useEffect } from 'react'

import { unlockScroll, lockScroll } from '@/utils/scroll'

import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'
import { dataLayerViewProduct } from '@/utils/dataLayer'
import { useCustomerContext } from '@/context/CustomerContext'
import { useRouter } from 'next/router'

const ProductOptions = (props) => {
  const { option, diaperAmount, product } = props

  const router = useRouter()

  const [activeOption, setActiveOption] = useState(0)

  const diaperCalculatorContext = useDiaperCalculatorContext()
  const { customer } = useCustomerContext()

  const handleOptionChange = (
    optionName,
    optionValue = false,
    index = activeOption
  ) => {
    props.handleOptionChange(optionName, optionValue, index)
    setActiveOption(index)
    dataLayerViewProduct({
      customer,
      product: product,
      url: router.asPath,
      variantOption: optionValue,
    })
  }

  const openDiaperCalculator = () => {
    lockScroll()
    diaperCalculatorContext.setIsOpen(true)
  }

  return (
    <>
      <div className="product-form__label">
        <span>Choose {option.name}:</span>{' '}
        {option.name == 'Size' ? (
          <span className="calculator" onClick={() => openDiaperCalculator()}>
            Diaper calculator
          </span>
        ) : (
          ''
        )}
      </div>
      <div className="product-form__items">
        {option.values.map((value, vIndex) => (
          <button
            className={`product-form__option ${
              activeOption == vIndex ? 'active' : ''
            }`}
            key={vIndex}
            value={value}
            onClick={() => handleOptionChange(option.name, value, vIndex)}
          >
            {value}
          </button>
        ))}
      </div>
      {option.name == 'Size' && diaperAmount ? (
        <p className="product-form__count">{diaperAmount} Diapers per pack</p>
      ) : (
        ''
      )}
    </>
  )
}

export default ProductOptions
