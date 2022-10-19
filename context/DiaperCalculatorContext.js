import { createContext, useContext, useState, useEffect } from 'react'
import DiaperCalculator from '../components/Layout/DiaperCalculator'
import Router, { useRouter } from 'next/router'

const DiaperCalculatorContext = createContext()

export function useDiaperCalculatorContext() {
  return useContext(DiaperCalculatorContext)
}

export function DiaperCalculatorProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [diaperCalculatorData, setDiaperCalculatorData] = useState({ birthday: null, weight: 0 })

  return (
    <DiaperCalculatorContext.Provider value={{ isOpen, setIsOpen, diaperCalculatorData, setDiaperCalculatorData }}>
      {children}
      <DiaperCalculator />
    </DiaperCalculatorContext.Provider>
  )
}
