import { useState, useEffect, useRef, createRef } from 'react'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'

const MyBabyForm = ({baby, type}) => {

  const [monthSelected, setMonthSelected] = useState(null)
  const [daySelected, setDaySelected] = useState(null)
  const [yearSelected, setYearSelected] = useState(null)
  const nameRef = useRef()

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

  const months = [
    {value: '1', label: 'January'},
    {value: '2', label: 'February'},
    {value: '3', label: 'March'},
    {value: '4', label: 'April'},
    {value: '5', label: 'May'},
    {value: '6', label: 'June'},
    {value: '7', label: 'July'},
    {value: '8', label: 'August'},
    {value: '9', label: 'September'},
    {value: '10', label: 'October'},
    {value: '11', label: 'November'},
    {value: '12', label: 'December'}
  ]

  const days = [...Array.from({length: 31}, (_, i) => i + 1)].map(day => {
    return {
      value: day,
      label: day,
    }
  })

  const currentYear = (new Date()).getFullYear();
  const years = Array.from({ length: (currentYear + 1 - 2015) / 1 + 1}, (_, i) => 1990 + (i * 1)).map(year => {
    return {
      value: year,
      label: year,
    }
  })

  return (
    <form className="account-baby-form">
      <h5>{type === 'new' ? 'Add' : 'Edit' } Baby</h5>
      <div className="input-group">
        <input className="input" type="text" placeholder="Baby's Name *" ref={nameRef} value={baby?.name} required />
        <label className="label">Baby's Name</label>
      </div>
      {/* city and country */}
      <div className="input-group--wrapper">
        <div className="input-group">
          <Select
            className={`select-dropdown-selector`}
            classNamePrefix="react-select"
            options={months}
            value={monthSelected}
            components={{ DropdownIndicator }}
            placeholder={"Month *"}
            styles={colourStyles}
            onChange={(e) => setMonthSelected(e)}
          />
          <label className="label">Month</label>
        </div>
        <div className="input-group">
          <Select
            className={`select-dropdown-selector`}
            classNamePrefix="react-select"
            options={days}
            value={daySelected}
            components={{ DropdownIndicator }}
            placeholder={"Day *"}
            styles={colourStyles}
            onChange={(e) => setDaySelected(e)}
          />
          <label className="label">Day</label>
        </div>
        <div className="input-group">
          <Select
            className={`select-dropdown-selector`}
            classNamePrefix="react-select"
            options={years}
            value={yearSelected}
            components={{ DropdownIndicator }}
            placeholder={"Year *"}
            styles={colourStyles}
            onChange={(e) => setYearSelected(e)}
          />
          <label className="label">Month</label>
        </div>
      </div>
    </form>
  );
};

export default MyBabyForm;