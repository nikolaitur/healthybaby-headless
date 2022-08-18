
import { useModalContext } from '../../../context/ModalContext'
// import IconClose from '@/svgs/close.svg'
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
    modalContext.setIsOpen(false)

    if(prevContent) {
      modalContext.setContent(prevContent)
      modalContext.setModalType('gated_product')
      modalContext.setIsOpen(true)
    }
  }

  return (
    <div className={`modal`}>
      <div className={`modal__overlay`}></div>
      <div className={`modal__container`}>
            {getContent(modalContext.modalType, children)}
      </div>
    </div>
  )
}

export default Modal