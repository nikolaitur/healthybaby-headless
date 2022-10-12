import AccountMainPage from "@/components/Account/AccountMainPage"
import { useCustomerContext } from "@/context/CustomerContext"
import { nacelleClient } from "services"
import LoadingState from "@/components/LoadingState"

export default function AccountTab({page}) {

  const { customer, customerLoading } = useCustomerContext()

  if (customerLoading) {
    return <LoadingState />
  }

  if (!customerLoading && customer) {
    return (
      <AccountMainPage page={page} />
    )
  }

  return <></>
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
