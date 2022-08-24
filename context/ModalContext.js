import { createContext, useContext, useState, useEffect } from 'react'
import Modal from '../components/Layout/Modal'
import Router, { useRouter } from 'next/router'

const ModalContext = createContext()

export function useModalContext() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [prevContent, setPrevContent] = useState('')
  const [modalType, setModalType] = useState(null)
  const router = useRouter()

//   useEffect(() => {
//     if (isOpen) document.querySelector('html').classList.add('disable-scroll')
//     if (!isOpen) document.querySelector('html').classList.remove('disable-scroll')

//   }, [isOpen, content])

  if(isOpen) {
    document.body.classList.add("no-scroll")
  } else {
    document.body.classList.remove("no-scroll")
  }

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, modalType, setModalType }}>
      {isOpen &&
        <Modal children={content} />
      }
      {children}
    </ModalContext.Provider>
  )
}