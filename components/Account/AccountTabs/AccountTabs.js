import { useCustomerContext } from '@/context/CustomerContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AccountTabs = ({tabs}) => {
  const { customer, logout } = useCustomerContext()
  const router = useRouter()
  return (
    <div className="account-navigation">
      <ul className="account-tabs">
        {tabs.map(tab => {
          return <li className="account-tab">{tab}</li>
        })}
        {customer?.shopify_login_redirect_url && customer.tags.includes('Active Subscriber') &&
          <li className="account-tab">
            <Link href={customer.shopify_login_redirect_url}>
              <a>Check Subscriptions</a>
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