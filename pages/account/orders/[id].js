import AccountMainPage from "@/components/Account/AccountMainPage"
import { useCustomerContext } from "@/context/CustomerContext"
import { nacelleClient } from "services"

export default function Order({page, orderId}) {

  const { customer, customerLoading } = useCustomerContext()

  if (customerLoading) {
    return <div>Loading...</div>
  }

  if (!customerLoading && customer) {
    return (
      <AccountMainPage page={page} orderId={orderId} />
    )
  }

  return <div>Please Log in to continue</div>
}

export async function getServerSideProps({params}) {

  const page = await nacelleClient.content({
    handles: ['account-page'],
    type: 'accountPage'
  })

  return {
    props: {
      handle: 'account',
      page: page[0],
      orderId: params.id
    }
  }
}
