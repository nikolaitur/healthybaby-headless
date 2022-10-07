import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import AccountHeader from '../AccountHeader'
import AccountTabs from '../AccountTabs'
import { useCustomerContext } from '@/context/CustomerContext'

const AccountMainPage = ({page}) => {

  const {headerDesktopImage, headerMobileImage } = {...page.fields}

  console.log("page:", page)
  const router = useRouter()
  const { customer } = useCustomerContext()
  const [selectedTab, setSelectedTab] = useState()


  const tabs = useMemo(
    () => ({
      'order-history': 'Order History',
      'my-info': 'My Info',
    }),
    [],
  )

  const onTabSelected = (tab) => {
    const tabKey = getTabKey(tab)
    setSelectedTab(tabKey)

    router.push(
      {
        pathname: `/account/${tabKey}`,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <div className="account-main">
      <AccountHeader headerDesktopImage={headerDesktopImage} headerMobileImage={headerMobileImage} />
      <AccountTabs tabs={Object.values(tabs)} />
      {/* Body Content */}
      <div></div>
    </div>
  )
}

export default AccountMainPage