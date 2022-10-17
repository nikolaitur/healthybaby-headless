import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import AccountHeader from '../AccountHeader'
import AccountTabs from '../AccountTabs'
import OrderHistory from '../OrderHistory'
import Order from '../Order'
import MyInfo from '../MyInfo'

const AccountMainPage = ({page, orderId}) => {

  console.log("page:", page)
  const router = useRouter()

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

  const onTabSelected = (tab, updateUrl = true) => {
    const tabKey = getTabKey(tab)
    setSelectedTab(tabKey)

    if (updateUrl) {
      router.push({pathname: `/account/${tabKey}`}, undefined, { shallow: true })
    }
  }

  const renderBody = (pickedTab) => {

    if (router.pathname === '/account/orders/[id]') {
      return <Order orderId={orderId} />
    }

    switch(pickedTab) {
      case 'my-info':
        return (<MyInfo page={page} />)
      case 'order-history':
        return (<OrderHistory />)
    }
  }

  // If tab doesn't exist, default to My Info
  useEffect(() => {
    if (!tabs[selectedTab] && router.pathname !== '/account/orders/[id]') {
      onTabSelected('My Info')
    } else if (router.pathname === '/account/orders/[id]') {
      onTabSelected('Order History', false)
    }
  }, [])

  return (
    <div className="account-main">
      <AccountHeader props={page.fields} />
      <AccountTabs tabs={tabs} selected={selectedTab} onSelected={onTabSelected} />
      {/* Body Content */}
      <div className="account-body">{renderBody(tab)}</div>
    </div>
  )
}

export default AccountMainPage