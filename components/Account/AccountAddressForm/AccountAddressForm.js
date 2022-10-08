import { useRef, createRef } from 'react'
import Select, { components } from 'react-select'

const AccountAddressForm = ({address}) => {

  const refs = ['address1', 'address2', 'city', 'company', 'country', 'firstName', 'lastName', 'phone', 'province', 'zip']

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

  return (
    <form className="account-address-form">
    <h5>Edit Address</h5>
    {/* first and last name */}
    <div className="input-group--wrapper">
      <div className="input-group">
        <input className="input" type="text" placeholder="First Name *" ref={formRef.current.firstName} value={address?.firstName} required />
        <label className="label">First Name</label>
      </div>
      <div className="input-group">
        <input className="input" type="text" placeholder="Last Name *" ref={formRef.current.lastName} value={address?.lastName} required />
        <label className="label">Last Name</label>
      </div>
    </div>
    {/* company and phone number */}
    <div className="input-group--wrapper">
      <div className="input-group">
        <input className="input" type="text" placeholder="Company" ref={formRef.current.company} value={address?.company} />
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
        <input className="input" type="text" placeholder="Address 1 *" ref={formRef.current.address1} value={address?.address1} required />
        <label className="label">Address 1</label>
      </div>
      <div className="input-group">
        <input className="input" type="text" placeholder="Address 2 (Apt. Suite, etc) *" ref={formRef.current.address2} value={address?.address2} required />
        <label className="label">Address 2</label>
      </div>
    </div>
    {/* city and country */}
    <div className="input-group--wrapper">
      <div className="input-group">
        <input className="input" type="text" placeholder="City *" ref={formRef.current.city} value={address?.city} required />
        <label className="label">City</label>
      </div>
      <div className="input-group">
        <input className="input" type="text" placeholder="Country *" ref={formRef.current.country} value={address?.country} required />
        <label className="label">Country</label>
      </div>
    </div>
    {/* state and zip code */}
    <div className="input-group--wrapper">
      <div className="input-group">
        <input className="input" type="text" placeholder="State *" ref={formRef.current.province} value={address?.province} required />
        <label className="label">State</label>
      </div>
      <div className="input-group">
        <input className="input" type="text" placeholder="Zip *" ref={formRef.current.zip} value={address?.zip} required />
        <label className="label">Zip</label>
      </div>
    </div>
  </form>
  )
}

export default AccountAddressForm