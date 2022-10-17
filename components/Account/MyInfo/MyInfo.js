import { useCustomerContext } from '@/context/CustomerContext'
import AccountAddress from '../AccountAddress'
import MyBaby from '../MyBaby'

const MyInfo = ({page}) => {
  const { customer } = useCustomerContext()

  return (
    <div className="account-my-info">
      <MyBaby page={page} />
      <div className="account-panel">
        <h3>My Info</h3>
        <div className="account-card">
          <div>
            <div className="account-card-label">Email</div>
            <p>{customer.email}</p>
          </div>
        </div>
      </div>
      <AccountAddress />
    </div>
  )
}

export default MyInfo