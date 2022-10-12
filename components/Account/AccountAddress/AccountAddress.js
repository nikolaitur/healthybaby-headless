import { useState, useEffect } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import Expand from 'react-expand-animated'
import AccountAddressCard from '../AccountAddressCard'
import AccountAddressForm from '../AccountAddressForm'
import LoadingState from '@/components/LoadingState'

const AccountAddress = () => {

  const { customer, addAddress, updateAddress, deleteAddress } = useCustomerContext()
  const [newAddressFormHeight, setNewAddressFormHeight] = useState(0)
  const [activeAddressEditForms, setActiveAddressEditForms] = useState([])
  const [countryList, setCountryList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleAddressFormExpand = () => {
    if (newAddressFormHeight === 0) {
      setNewAddressFormHeight('auto')
    } else {
      setNewAddressFormHeight(0)
    }
    setActiveAddressEditForms([])
  }

  const onUpdateAddress = async ({address, addressId, method, defaultAddressIsChecked = false}) => {
    setIsLoading(true)
    setNewAddressFormHeight(0)
    setActiveAddressEditForms([])

    if (method === 'add') {
      await addAddress({address, defaultAddressIsChecked})
    }
    if (method === 'update') {
      await updateAddress({address, addressId, defaultAddressIsChecked})
    }
    if (method === 'remove') {
      await deleteAddress({addressId})
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch('/api/shopify/get-countries').then(res => res.json())
      if (response.message === 'success') {
        let countryList = response.data.filter(country => country.code !== '*')
        countryList = countryList.map(country => {
          return {
            ...country,
            label: country.name,
            value: country.code,
            provinces: country.provinces.map(province => {
              return {
                ...province,
                label: province.name,
                value: province.code
              }
            })
          }
        })
        setCountryList(countryList)
      }
    }
    getCountries()
  }, [])

  return (
    <div className="account-panel">
      <h3>My Addresses</h3>
      {customer.addresses.length > 0 && <ul>
        {isLoading ? (
          <LoadingState />
        ):(
          <>
            {customer.addresses.sort((a, b) => (a.id === customer.defaultAddress.id ? -1 : 1)).map((address, index) => {
              const isDefaultAddress = address.id === customer.defaultAddress.id
              return <AccountAddressCard key={address.id} countryList={countryList} address={address} index={index} onUpdateAddress={onUpdateAddress} isDefaultAddress={isDefaultAddress} newAddressFormHeight={newAddressFormHeight} setNewAddressFormHeight={setNewAddressFormHeight} activeAddressEditForms={activeAddressEditForms} setActiveAddressEditForms={setActiveAddressEditForms} />
            })}
          </>
        )}
      </ul>}
      {(!isLoading && !newAddressFormHeight && activeAddressEditForms.length === 0) && <button onClick={() => toggleAddressFormExpand()} className="account-panel-cta-btn btn secondary">Add New Address</button>}
      <Expand open={newAddressFormHeight !== 0} duration={300}>
        <AccountAddressForm type={'new'} countryList={countryList} onUpdateAddress={onUpdateAddress} toggleExpand={toggleAddressFormExpand} />
      </Expand>
    </div>
  );
};

export default AccountAddress;