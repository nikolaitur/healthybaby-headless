import { useState } from 'react'
import Expand from 'react-expand-animated'
import AccountAddressForm from '../AccountAddressForm'

const AccountAddress = ({address, isDefaultAddress}) => {
  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
  }

  return (
    <>
      <li className="account-card">
        <div>
          {isDefaultAddress && <div className="account-card-label">Default</div>}
          <p className="large">{address.name}</p>
          {address.company && <p className="large">{address.company}</p>}
          <p className="large">{address.address1 || ''}</p>
          {address.address2 && <p className="large">{address.address2}</p>}
          <p className="large">{address.city ? address.city + ',' : ''} {address.provinceCode || ''} {address.zip || ''}</p>
        </div>
        <div className="account-card-actions">
          <button onClick={() => toggleExpand()}>Edit / Remove</button>
        </div>
      </li>
      <Expand open={height !== 0} duration={300}>
        <AccountAddressForm address={address} />
      </Expand>
    </>
  )
}

export default AccountAddress