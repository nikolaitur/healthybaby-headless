import AccountMainPage from "@/components/Account/AccountMainPage"
import { useCustomerContext } from "@/context/CustomerContext"
import { nacelleClient } from "services"
import LoadingState from "@/components/LoadingState"
import { useRouter } from 'next/router'

export default function AccountPage({page}) {

  const { customer, customerLoading } = useCustomerContext()
  const router = useRouter()

  if (customerLoading) {
    return <LoadingState />
  }

  if (!customerLoading && customer) {
    return (
      <AccountMainPage page={page} />
    )
  }

  router.push('/')

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
