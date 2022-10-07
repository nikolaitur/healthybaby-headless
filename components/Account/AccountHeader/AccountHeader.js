import { useCustomerContext } from '@/context/CustomerContext'
import Image from 'next/image'

const AccountHeader = ({headerDesktopImage, headerMobileImage}) => {

  const { customer } = useCustomerContext()
  return (
    <div className="account-header">
      <div className="account-header__image">
        {headerDesktopImage?.fields?.file?.url && <Image
          src={`https://${headerDesktopImage.fields.file.url}`}
          alt={headerDesktopImage.fields.title}
          layout="fill"
        />}
        {/* {headerMobileImage?.fields?.file?.url && <Image
          src={`https://${headerMobileImage.fields.file.url}`}
          alt={headerMobileImage.fields.title}
          layout="fill"
        />} */}
      </div>
      <div className="account-header__content">
        <h2>
          Welcome back,
          <br/>
          Shazi
        </h2>
      </div>
    </div>
  )
}

export default AccountHeader