import { useModalContext } from '../../../context/ModalContext'
import IconClose from '../../../svgs/close-icon.svg'

import CreateAccountForm from '../../Layout/Forms/CreateAccountForm'
import LoginAccountForm from '../../Layout/Forms/LoginAccountForm'
import ProductQuickView from '../../Product/ProductQuickView'
import ForgotPasswordForm from '../Forms/ForgotPasswordForm'

const Modal = ({props, children}) => {

  const { className } = {...children}

  const modalContext = useModalContext()

  console.log(modalContext.isOpen, children)

  const getContent = (type, children) => {
    switch(type) {
      case 'create':
        return <CreateAccountForm />
      case 'login':
        return <LoginAccountForm redirect={'/account'} />
      case 'forgot_password':
        return <ForgotPasswordForm />
      case 'quickview':
        return <ProductQuickView content={children} />
      default:
        return children
    }
  }

  const closeModal = () => {
    modalContext.setIsOpen(false)
  }

  return (
    <>
      <div className={`modal ${className}`}>
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