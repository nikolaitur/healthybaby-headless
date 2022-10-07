import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import AccountHeader from '../AccountHeader'
import AccountTabs from '../AccountTabs'
import OrderHistory from '../OrderHistory'
import MyInfo from '../MyInfo'
import { useCustomerContext } from '@/context/CustomerContext'

const AccountMainPage = ({page}) => {

  const {headerDesktopImage, headerMobileImage } = {...page.fields}

  console.log("page:", page)
  const router = useRouter()
  const { customer } = useCustomerContext()

  const { tab } = router.query
  const tabs = useMemo(
    () => ({
      'order-history': 'Order History',
      'my-info': 'My Info',
    }),
    [],
  )

  const getTabKey = (tabValue) =>
    Object.keys(tabs).find((key) => tabs[key] === tabValue)

  const [selectedTab, setSelectedTab] = useState(tab)

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

  const renderBody = (pickedTab) => {
    switch(pickedTab) {
      case 'my-info':
        return (<MyInfo />)
      case 'order-history':
        return (<OrderHistory />)
    }
  }

  // If tab doesn't exist, default to My Info
  useEffect(() => {
    if (!tabs[selectedTab]) {
      onTabSelected('My Info')
    }
  }, [])

  return (
    <div className="account-main">
      <AccountHeader headerDesktopImage={headerDesktopImage} headerMobileImage={headerMobileImage} />
      <AccountTabs tabs={tabs} selected={selectedTab} onSelected={onTabSelected} />
      {/* Body Content */}
      <div>{renderBody(tab)}</div>
    </div>
  )
}

export default AccountMainPage