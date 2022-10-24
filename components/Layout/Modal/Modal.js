import { useModalContext } from '../../../context/ModalContext'
import IconClose from '../../../svgs/close-icon.svg'
import IconCloseLarge from '../../../svgs/close-icon-large.svg'

import CreateAccountForm from '../../Layout/Forms/CreateAccountForm'
import LoginAccountForm from '../../Layout/Forms/LoginAccountForm'
import ProductQuickView from '../../Product/ProductQuickView'
import ForgotPasswordForm from '../Forms/ForgotPasswordForm'
import SubscribeModal from '../../Product/SubscribeModal'

const Modal = ({props, children, modalLevel = 'primary'}) => {

  const { className } = {...children}

  const modalContext = useModalContext()

  const getContent = (children) => {

    let type = modalContext.modalType

    if (modalLevel !== 'primary') {
      type = modalContext.secondaryModalType
    }

    switch(type) {
      case 'create':
        return <CreateAccountForm />
      case 'login':
        return <LoginAccountForm redirect={'/account'} />
      case 'forgot_password':
        return <ForgotPasswordForm />
      case 'quickview':
        return <ProductQuickView content={children} />
      case 'subscribe-info-modal':
        return <SubscribeModal content={children} />
      default:
        return children
    }
  }

  const closeModal = () => {
    if (modalLevel !== 'primary') {
      modalContext.setIsSecondaryModalOpen(false)
    } else {
      modalContext.setIsOpen(false)
    }
  }

  const getModalLevelType = () => {
    if (modalLevel !== 'primary') {
      return modalContext.secondaryModalType
    }
    return modalContext.modalType
  }

  return (
    <div className={`modal ${getModalLevelType() == "quickview" ? 'quickview' : ''}`}>
      <div className="modal__content">
        <div className="modal__content-container">
          <div className="modal__close" onClick={() => closeModal()}>
            {getModalLevelType() == "quickview" ? <IconCloseLarge />  : <IconClose /> }
          </div>
          {getContent(children)}
        </div>
      </div>
      <div className={`modal__overlay`} onClick={() => closeModal()}></div>
    </div>
  )
}

export default Modal