import { useState, useEffect, useRef, createRef } from 'react'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'

const AccountAddressForm = ({address, countryList, type, onUpdateAddress, toggleExpand}) => {

  const [countrySelected, setCountrySelected] = useState('')
  const [stateSelected, setStateSelected] = useState('')
  const checkboxRef = useRef()

  const refs = ['address1', 'address2', 'city', 'company', 'firstName', 'lastName', 'phone', 'zip']

  const formRef = useRef(refs.reduce((carry, ref) => {
    return {
      ...carry,
      [ref]: createRef()
    }
  }, {}))


  const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <div className="dropdown-selector__arrow-open"><IconCaretTop /></div>
        </components.DropdownIndicator>
      )
    )
  }
  const colourStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? '#00B188' : '#fff',
      color: state.isSelected || state.isFocused ? '#fff' : '#3D3331',
    }),
  }

  const onAddressFormSubmission = async (e, method) => {
    e.preventDefault()
    const data = {}

    for (const keyName of Object.keys(formRef.current)) {
      const value = formRef.current[keyName].current.value
      data[keyName] = value
    }

    data['country'] = countrySelected.label
    data['province'] = stateSelected.label

    await onUpdateAddress({address: data, addressId: (type === 'new' ? undefined : address.id), method, defaultAddressIsChecked: checkboxRef.current.checked})

    if (type === 'new') {
      setCountrySelected('')
      setStateSelected('')
      refs.forEach(ref => {
        formRef.current[ref].current.value = ''
      })
      checkboxRef.current.checked = false
    }
  }

  useEffect(() => {
    if (address) {
      const country = countryList.find(country => country.code === address.countryCodeV2)
      const state = country?.provinces.find(province => province.code === address.provinceCode)
      if (country && state) {
        setCountrySelected(country)
        setStateSelected(state)
      }
    }
    refs.forEach(ref => {
      if (address && address[ref]) {
        formRef.current[ref].current.value = address[ref]
      }
    })
  }, [countryList])

  return (
    <form
      onSubmit={(e) => {
        if (type === 'new') {
          onAddressFormSubmission(e, 'add')
        } else {
          onAddressFormSubmission(e, 'update')
        }
      }}
      className="account-address-form">
      <h5>{type === 'new' ? 'Add' : 'Edit' } Address</h5>
      {/* first and last name */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <input className="input" type="text" placeholder="First Name *" ref={formRef.current.firstName} required />
          <label className="label">First Name</label>
        </div>
        <div className="input-group">
          <input className="input" type="text" placeholder="Last Name *" ref={formRef.current.lastName} required />
          <label className="label">Last Name</label>
        </div>
      </div>
      {/* company and phone number */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <input className="input" type="text" placeholder="Company" ref={formRef.current.company} />
          <label className="label">Company</label>
        </div>
        <div className="input-group">
        <input
            className="input"
            type="text"
            placeholder="Phone Number (For news & exclusive offers)"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            ref={formRef.current.phone}
            value={address?.phone}
          />
          <label className="label">Phone Number</label>
        </div>
      </div>
      {/* address 1 and 2 */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <input className="input" type="text" placeholder="Address 1 *" ref={formRef.current.address1} required />
          <label className="label">Address 1</label>
        </div>
        <div className="input-group">
          <input className="input" type="text" placeholder="Address 2 (Apt. Suite, etc) *" ref={formRef.current.address2} required />
          <label className="label">Address 2</label>
        </div>
      </div>
      {/* city and country */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <input className="input" type="text" placeholder="City *" ref={formRef.current.city} required />
          <label className="label">City</label>
        </div>
        <div className="input-group">
          <Select
            className={`select-dropdown-selector`}
            classNamePrefix="react-select"
            options={countryList}
            value={countrySelected}
            components={{ DropdownIndicator }}
            placeholder={"Country *"}
            styles={colourStyles}
            onChange={(e) => setCountrySelected(e)}
          />
          <label className="label">Country</label>
        </div>
      </div>
      {/* state and zip code */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <Select
            className={`select-dropdown-selector`}
            classNamePrefix="react-select"
            options={countrySelected ? countrySelected.provinces : []}
            value={stateSelected}
            components={{ DropdownIndicator }}
            placeholder={"State *"}
            styles={colourStyles}
            isDisabled={countrySelected === ''}
            onChange={(e) => setStateSelected(e)}
          />
          <label className="label">State</label>
        </div>
        <div className="input-group">
          <input className="input" type="text" placeholder="Zip *" ref={formRef.current.zip} required />
          <label className="label">Zip</label>
        </div>
      </div>
      <div className="input-group input-group--checkbox">
        <input className="checkbox" type="checkbox" id={`set_as_default_address-${address ? address.id : 'new'}`} ref={checkboxRef} />
        <label className="label" htmlFor={`set_as_default_address-${address ? address.id : 'new'}`}>Set as default address</label>
      </div>
      <div className="account-panel-ctas-wrapper">
        {type === 'new' ? (
          <button className="account-panel-cta-btn btn secondary" disabled={!countrySelected || !stateSelected}>Add Address</button>
        ):(
          <>
            <button className={`account-panel-cta-btn btn secondary`} disabled={!countrySelected || !stateSelected}>Save Address</button>
            <button
              onClick={(e) => {onAddressFormSubmission(e, 'remove')}}
              className="account-panel-cta-btn btn account-remove-btn">Remove Address</button>
          </>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleExpand()
          }}
          className="account-panel-cta-btn account-form-cancel-btn">Cancel</button>
      </div>
    </form>
  )
}

export default AccountAddressForm