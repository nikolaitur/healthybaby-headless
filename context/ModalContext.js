import { createContext, useContext, useState, useEffect } from 'react'
import Modal from '../components/Layout/Modal'
import Router, { useRouter } from 'next/router'
import { unlockScroll, lockScroll } from '@/utils/scroll'

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

  useEffect(() => {
     if(isOpen) {
      document.body.classList.add("no-scroll")
      lockScroll()
    } else {
      document.body.classList.remove("no-scroll")
      unlockScroll()
    }
  }, [isOpen])

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, modalType, setModalType, setContent }}>
      {isOpen &&
        <Modal children={content} />
      }
      {children}
    </ModalContext.Provider>
  )
}