import { useState } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import Expand from 'react-expand-animated'
import AccountAddress from '../AccountAddress'
import AccountAddressForm from '../AccountAddressForm'
import MyBaby from '../MyBaby'
import { getMetafield } from '@/utils/getMetafield'
import LoadingState from '@/components/LoadingState'

const MyInfo = ({page}) => {
  const { customer, updateBabyInformation } = useCustomerContext()
  const { myBabyHeader, myBabyDescription} = {...page.fields}

  const [height, setHeight] = useState(0)
  const [loadingBabies, setLoadingBabies] = useState(false)

  const toggleExpand = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
  }

  const onClickHandler = async () => {
    setLoadingBabies(true)
    const response = await updateBabyInformation({customer})
    setLoadingBabies(false)
    console.log("response:", response)
  }

  let babyNames = getMetafield({metafields: customer.metafields, namespace: 'baby', key: 'name', returnValue: true})
  let babyBirthdays = getMetafield({metafields: customer.metafields, namespace: 'baby', key: 'birthday', returnValue: true})

  const babies = babyNames && Object.values(babyNames).map((_, index) => {
    return {
      name: babyNames[index],
      birthday: babyBirthdays[index]
    }
  })

  return (
    <div className="account-my-info">
      <div className="account-panel account-panel--my-baby">
        <button onClick={() => onClickHandler()}>update baby info</button>
        <h3>{myBabyHeader}</h3>
        <h4>{myBabyDescription}</h4>
        {babies?.length > 0 &&
          <>
            {loadingBabies ? (
              <LoadingState />
            ):(
              <ul>
                {babies.map(baby => {
                  return <MyBaby baby={baby} />
                })}
              </ul>
            )}
          </>
        }
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
            return <AccountAddress key={address.id} address={address} isDefaultAddress={isDefaultAddress} />
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