import { useState } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import moment from 'moment'
import Expand from 'react-expand-animated'
import AccountAddress from '../AccountAddress'
import AccountAddressForm from '../AccountAddressForm'

const MyInfo = ({page}) => {
  const { customer } = useCustomerContext()
  const { myBabyHeader, myBabyDescription} = {...page.fields}

  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
  }

  return (
    <div className="account-my-info">
      <div className="account-panel account-panel--my-baby">
        <h3>{myBabyHeader}</h3>
        <h4>{myBabyDescription}</h4>
        <div className="account-card"></div>
      </div>
      <div className="account-panel">
        <h3>My Info</h3>
        <div className="account-card">
          <div>
            <div className="account-card-label">Email</div>
            <p>{customer.displayName}</p>
          </div>
        </div>
      </div>
      <div className="account-panel">
        <h3>My Addresses</h3>
        {customer.addresses.length > 0 && <ul>
          {customer.addresses.map(address => {
            const isDefaultAddress = address.id === customer.defaultAddress.id
            return <AccountAddress address={address} isDefaultAddress={isDefaultAddress} />
          })}
        </ul>}
        <button onClick={() => toggleExpand()} className="account-panel-cta-btn btn secondary">Add New Address</button>
        <Expand open={height !== 0} duration={300}>
          <AccountAddressForm type={'new'} />
        </Expand>
      </div>
    </div>
  )
}

export default MyInfo