import { createContext, useContext, useState, useEffect } from 'react'
import DiaperCalculator from '../components/Layout/DiaperCalculator'
import Router, { useRouter } from 'next/router'

const DiaperCalculatorContext = createContext()

export function useDiaperCalculatorContext() {
  return useContext(DiaperCalculatorContext)
}

export function DiaperCalculatorProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const [content, setContent] = useState('')

  useEffect(() => {
    // if(isOpen) {
    //   document.body.classList.add("no-scroll")
    // } else {
    //   document.body.classList.remove("no-scroll")
    // }
    console.log(isOpen)
  }, [isOpen])

  return (
    <DiaperCalculatorContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <DiaperCalculator />
    </DiaperCalculatorContext.Provider>
  )
}
