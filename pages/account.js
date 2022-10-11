import { useCustomerContext } from "@/context/CustomerContext"

export default function AccountPage() {

  const { customer } = useCustomerContext()

  return (
    <div className="account-page">
      <h1>Account Page</h1>
      {customer?.shopify_login_redirect_url && <a href={customer.shopify_login_redirect_url}>Check Subscriptions</a>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      handle: 'account'
    }
  }

}
