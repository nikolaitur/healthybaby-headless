import { useCustomerContext } from '@/context/CustomerContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AccountTabs = ({tabs, selected, onSelected}) => {
  const { customer, logout } = useCustomerContext()
  const router = useRouter()
  return (
    <div className="account-navigation">
      <ul className="account-tabs">
        {Object.keys(tabs).map((tab, index) => {
          return <li key={index} className={`account-tab ${selected === tab ? 'link-is-active' : ''}`}>
            <button onClick={() => onSelected(tabs[tab])}>{tabs[tab]}</button>
          </li>
        })}
        {customer?.shopify_login_redirect_url && customer.tags.includes('Active Subscriber') &&
          <li className="account-tab">
            <Link href={customer.shopify_login_redirect_url}>
              <a>Subscriptions</a>
            </Link>
          </li>
        }
        <li className="account-tab">
          <button onClick={() => logout().then(() => router.push('/'))}>Log Out</button>
        </li>
      </ul>
    </div>
  )
}

export default AccountTabs