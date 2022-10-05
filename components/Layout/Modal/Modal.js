
import { useModalContext } from '../../../context/ModalContext'
import IconClose from '../../../svgs/close-icon.svg'
import CreateAccountForm from '../../Layout/Forms/CreateAccountForm'
import LoginAccountForm from '../../Layout/Forms/LoginAccountForm'
// import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm'
// import GatedProductModal from '@/components/Forms/GatedProductModal'
// import CookingClassSignupForm from '@/components/Forms/CookingClassSignupForm'

const Modal = ({props, children}) => {

  const modalContext = useModalContext()
  const { prevContent } = modalContext

  // modalContext.setIsOpen(false)

  console.log(modalContext.isOpen)

  const getContent = (type, children) => {
    switch(type) {
      case 'create':
        return <CreateAccountForm />
      case 'login':
        return <LoginAccountForm redirect={'/account'} />
      default:
        return children
    }
  }

  const closeModal = () => {
    console.log("Closed")
    modalContext.setIsOpen(false)
  }

  return (
    <>
      <div className={`modal`}>
        <div className={`modal__container`}>
            <div className="modal__content">
              <div className="modal__close" onClick={() => closeModal()}>
                  <IconClose />
              </div>
              {getContent(modalContext.modalType, children)}
            </div>   
        </div>
      </div>
      <div className={`modal__overlay`} onClick={() => closeModal()}></div>
    </>

  )
}

export default Modal