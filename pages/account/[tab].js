import AccountMainPage from "@/components/Account/AccountMainPage"
import { useCustomerContext } from "@/context/CustomerContext"
import { nacelleClient } from "services"

export default function AccountTab({page}) {

  const { customer, customerLoading } = useCustomerContext()

  // return (
  //   <div className="account-page">
  //     <h1>Account Page</h1>
  //     {customer?.shopify_login_redirect_url && <a href={customer.shopify_login_redirect_url}>Check Subscriptions</a>}
  //   </div>
  // )


  if (customerLoading) {
    return <div>Loading...</div>
  }

  if (!customerLoading && customer) {
    return (
      <AccountMainPage page={page} />
    )
  }

  return <div>Please Log in to continue</div>
}

export async function getServerSideProps() {

  const page = await nacelleClient.content({
    handles: ['account-page'],
    type: 'accountPage'
  })

  return {
    props: {
      handle: 'account',
      page: page[0]
    }
  }
}
