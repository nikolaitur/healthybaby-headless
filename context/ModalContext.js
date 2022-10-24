import { createContext, useContext, useState, useEffect } from 'react'
import Modal from '../components/Layout/Modal'
import { unlockScroll, lockScroll } from '@/utils/scroll'

const ModalContext = createContext()

export function useModalContext() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [modalType, setModalType] = useState(null)

  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false)
  const [secondaryModalContent, setSecondaryModalContent] = useState('')
  const [secondaryModalType, setSecondaryModalType] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
      lockScroll()
    } else {
      document.body.classList.remove('no-scroll')
      unlockScroll()
    }
  }, [isOpen])

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        modalType,
        setModalType,
        setContent,
        isSecondaryModalOpen,
        setIsSecondaryModalOpen,
        secondaryModalContent,
        setSecondaryModalContent,
        secondaryModalType,
        setSecondaryModalType
      }}
    >
      {isOpen && <Modal children={content} modalLevel={'primary'} />}
      {isSecondaryModalOpen && <Modal children={secondaryModalContent} modalLevel={'secondary'} />}
      {children}
    </ModalContext.Provider>
  )
}
