import { useEffect, useState } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import { useRouter } from 'next/router'

const AccountHeader = ({props}) => {

  const router = useRouter()
  const {headerDesktopImage, headerMobileImage, headerText } = {...props}

  const isDesktop = useMediaQuery(
    { minWidth: 1074 }
  )
  const { customer, logout } = useCustomerContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="account-header">
      <div className="account-header__image">
        {mounted && isDesktop && headerDesktopImage?.fields?.file?.url && <Image
          src={`https:${headerDesktopImage.fields.file.url}`}
          alt={headerDesktopImage.fields.title}
          layout="fill"
        />}
        {mounted && !isDesktop && headerMobileImage?.fields?.file?.url && <Image
          src={`https:${headerMobileImage.fields.file.url}`}
          alt={headerMobileImage.fields.title}
          layout="fill"
        />}
      </div>
      <div className="account-header__content">
        <h2>
          {headerText}
          <br/>
          <span className="account-header__customer-name">{customer?.firstName.toLowerCase()}</span>
          {mounted && !isDesktop && <div className="account-header__log-out-btn">
            <button onClick={() => logout().then(() => router.push('/'))}>Log Out</button>
          </div>}
        </h2>
      </div>
    </div>
  )
}

export default AccountHeader