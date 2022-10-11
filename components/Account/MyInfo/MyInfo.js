import { useState } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import Expand from 'react-expand-animated'
import AccountAddress from '../AccountAddress'
import AccountAddressForm from '../AccountAddressForm'
import MyBaby from '../MyBaby'
import MyBabyForm from '../MyBabyForm'
import { getMetafield } from '@/utils/getMetafield'
import LoadingState from '@/components/LoadingState'

const MyInfo = ({page}) => {
  const { customer, createBabyMetafields, updateBabyInformation } = useCustomerContext()
  const { myBabyHeader, myBabyDescription} = {...page.fields}

  const [newBabyFormHeight, setNewBabyFormHeight] = useState(0)
  const [newAddressFormHeight, setNewAddressFormHeight] = useState(0)
  const [activeEditForms, setActiveEditForms] = useState([])
  const [loadingBabies, setLoadingBabies] = useState(false)

  const toggleBabyFormExpand = () => {
    newBabyFormHeight === 0 ? setNewBabyFormHeight('auto') : setNewBabyFormHeight(0)
  }

  const toggleAddressFormExpand = () => {
    newAddressFormHeight === 0 ? setNewAddressFormHeight('auto') : setNewAddressFormHeight(0)
  }

  const onUpdateBabyInfo = async ({baby, method, index}) => {
    setLoadingBabies(true)
    setNewBabyFormHeight(0)
    setActiveEditForms([])

    let metafields = customer.metafields.filter(metafield => metafield.namespace === 'baby')

    // if add - append new values for each metafield
      // if metafield already exist, add value for each metafield
      // if metafield doesn't, create a new metafield for each
    if (method === 'add') {
      if (metafields.length === 0) {
        method = 'create'
        metafields = [
          {
            ownerId: customer.id,
            namespace: 'baby',
            key: 'birthday',
            type: 'json',
            value: JSON.stringify([baby.birthday])
          },
          {
            ownerId: customer.id,
            namespace: 'baby',
            key: 'name',
            type: 'json',
            value: JSON.stringify([baby.name])
          }
        ]
      } else {
        metafields = metafields.map((metafield) => {
          const newMetafieldValue = JSON.parse(metafield.value)
          if (metafield.key === 'name') newMetafieldValue.push(baby.name)
          if (metafield.key === 'birthday') newMetafieldValue.push(baby.birthday)
          return {
            ...metafield,
            value: JSON.stringify(newMetafieldValue)
          }
        })
      }
    }

    // if update - find index to update value for each metafield

    if (method === 'update') {
      metafields = metafields.map((metafield) => {
        const newMetafieldValue = JSON.parse(metafield.value)
        if (metafield.key === 'name') newMetafieldValue[index] = baby.name
        if (metafield.key === 'birthday') newMetafieldValue[index] = baby.birthday
        return {
          ...metafield,
          value: JSON.stringify(newMetafieldValue)
        }
      })
    }

    // if remove - find index to remove value from each metafield
    if (method === 'remove') {
      metafields = metafields.map((metafield) => {
        const newMetafieldValue = JSON.parse(metafield.value)
        newMetafieldValue.splice(index, 1);
        return {
          ...metafield,
          value: JSON.stringify(newMetafieldValue)
        }
      })
    }

    if (method === 'create') {
      await createBabyMetafields({metafields})
    } else {
      await updateBabyInformation({customer, metafields})
    }

    setLoadingBabies(false)
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
        <h3>{myBabyHeader}</h3>
        <h4>{myBabyDescription}</h4>
          {loadingBabies ? (
            <LoadingState />
          ):(
            <>
              {babies?.length > 0 &&
                <ul>
                  {babies.map((baby, index) => {
                    return <MyBaby baby={baby} key={index} index={index} onUpdateBabyInfo={onUpdateBabyInfo} newBabyFormHeight={newBabyFormHeight} setNewBabyFormHeight={setNewBabyFormHeight} activeEditForms={activeEditForms} setActiveEditForms={setActiveEditForms} />
                  })}
                </ul>
              }
            </>
          )}
        {(!loadingBabies && !newBabyFormHeight && activeEditForms.length === 0) && <button onClick={() => toggleBabyFormExpand()} className="account-panel-cta-btn btn secondary">Add New Baby</button>}
        <Expand open={newBabyFormHeight !== 0} duration={300}>
          <MyBabyForm type={'new'} setHeight={setNewBabyFormHeight} onUpdateBabyInfo={onUpdateBabyInfo} />
        </Expand>
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
        <button onClick={() => toggleAddressFormExpand()} className="account-panel-cta-btn btn secondary">Add New Address</button>
        <Expand open={newAddressFormHeight !== 0} duration={300}>
          <AccountAddressForm type={'new'} />
        </Expand>
      </div>
    </div>
  )
}

export default MyInfo