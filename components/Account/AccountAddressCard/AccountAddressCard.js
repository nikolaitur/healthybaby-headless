import { useState } from 'react'
import Expand from 'react-expand-animated'
import AccountAddressForm from '../AccountAddressForm'

const AccountAddress = ({address, countryList, index, onUpdateAddress, isDefaultAddress, newAddressFormHeight, setNewAddressFormHeight, activeAddressEditForms, setActiveAddressEditForms}) => {
  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    if (height === 0) {
      setHeight('auto')
      setNewAddressFormHeight(0)
      setActiveAddressEditForms([...new Set([...activeAddressEditForms, index])])
    } else {
      setHeight(0)
      setActiveAddressEditForms([...activeAddressEditForms].filter(formIndex => formIndex !== index))
    }
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
      {!newAddressFormHeight &&
        <Expand open={height !== 0} duration={300}>
          <AccountAddressForm address={address} countryList={countryList} onUpdateAddress={onUpdateAddress} toggleExpand={toggleExpand} />
        </Expand>
      }
    </>
  )
}

export default AccountAddress