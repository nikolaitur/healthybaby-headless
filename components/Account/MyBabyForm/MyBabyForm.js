import { useState, useEffect, useRef } from 'react'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'

const MyBabyForm = ({baby, index, type, onUpdateBabyInfo, toggleExpand}) => {
  const {name, birthday} = {...baby}
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
    {value: '01', label: 'January'},
    {value: '02', label: 'February'},
    {value: '03', label: 'March'},
    {value: '04', label: 'April'},
    {value: '05', label: 'May'},
    {value: '06', label: 'June'},
    {value: '07', label: 'July'},
    {value: '08', label: 'August'},
    {value: '09', label: 'September'},
    {value: '10', label: 'October'},
    {value: '11', label: 'November'},
    {value: '12', label: 'December'}
  ]

  const days = [...Array.from({length: 31}, (_, i) => i + 1)].map(day => {
    return {
      value: (day).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
      label: day.toString(),
    }
  })

  const currentYear = (new Date()).getFullYear();
  const years = Array.from({ length: (currentYear + 1 - 2015) / 1 + 1}, (_, i) => 2015 + (i * 1)).map(year => {
    return {
      value: year.toString(),
      label: year.toString(),
    }
  })

  useEffect(() => {
    if (name) {
      nameRef.current.value = name
    }
    if (birthday) {
      const birthdateSplit = birthday.split('/')
      setMonthSelected(months.find(month => month.value === birthdateSplit[0]))
      setDaySelected(days.find(day => day.value === birthdateSplit[1]))
      setYearSelected(years.find(year => year.value === birthdateSplit[2]))
    }
  }, [])

  return (
    <form className="account-baby-form">
      <h5>{type === 'new' ? 'Add' : 'Edit' } Baby</h5>
      <div className="input-group">
        <input className="input" type="text" placeholder="Baby's Name *" ref={nameRef} required />
        <label className="label">Baby's Name</label>
      </div>
      {/* city and country */}
      <div className="input-group--wrapper">
        <div className="input-group input-group--thirds">
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
        <div className="input-group input-group--thirds">
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
        <div className="input-group input-group--thirds">
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
          <label className="label">Year</label>
        </div>
      </div>
      <div className="account-panel-ctas-wrapper">
        {type === 'new' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              const baby = {
                name: nameRef.current.value,
                birthday: `${monthSelected.value}/${daySelected.value}/${yearSelected.value}`
              }
              onUpdateBabyInfo({baby, method: 'add'})
              setMonthSelected(null)
              setDaySelected(null)
              setYearSelected(null)
              nameRef.current.value = ''
            }}
            className="account-panel-cta-btn btn secondary">Add Baby</button>
        ):(
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                const baby = {
                  name: nameRef.current.value,
                  birthday: `${monthSelected.value}/${daySelected.value}/${yearSelected.value}`
                }
                onUpdateBabyInfo({baby, method: 'update', index})
              }}
              className={`account-panel-cta-btn btn secondary ${monthSelected && daySelected && yearSelected ? '' : 'disabled' }`}>Save Baby</button>
            <button
              onClick={(e) => {
                e.preventDefault()
                onUpdateBabyInfo({baby, method: 'remove', index})
              }}
              className="account-panel-cta-btn btn account-remove-btn">Remove Baby</button>
          </>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleExpand()
          }}
          className="account-panel-cta-btn">Cancel</button>
      </div>
    </form>
  );
};

export default MyBabyForm;