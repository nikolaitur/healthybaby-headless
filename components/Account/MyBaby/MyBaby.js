import { useState } from 'react'
import { useCustomerContext } from '@/context/CustomerContext'
import Expand from 'react-expand-animated'
import MyBabyCard from '../MyBabyCard'
import MyBabyForm from '../MyBabyForm'
import { getMetafield } from '@/utils/getMetafield'
import LoadingState from '@/components/LoadingState'

const MyBaby = ({page}) => {

  const { customer, createBabyMetafields, updateBabyInformation } = useCustomerContext()

  const { myBabyHeader, myBabyDescription} = {...page.fields}

  const [newBabyFormHeight, setNewBabyFormHeight] = useState(0)
  const [activeBabyEditForms, setActiveBabyEditForms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleBabyFormExpand = () => {
    if (newBabyFormHeight === 0) {
      setNewBabyFormHeight('auto')
    } else {
      setNewBabyFormHeight(0)
    }
    setActiveBabyEditForms([])
  }

  const onUpdateBabyInfo = async ({baby, method, index}) => {
    setIsLoading(true)
    setNewBabyFormHeight(0)
    setActiveBabyEditForms([])

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

    setIsLoading(false)
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
    <div className="account-panel account-panel--my-baby">
      <h3>{myBabyHeader}</h3>
      <h4>{myBabyDescription}</h4>
        {isLoading ? (
          <LoadingState />
        ):(
          <>
            {babies?.length > 0 &&
              <ul>
                {babies.map((baby, index) => {
                  return <MyBabyCard baby={baby} key={index} index={index} onUpdateBabyInfo={onUpdateBabyInfo} newBabyFormHeight={newBabyFormHeight} setNewBabyFormHeight={setNewBabyFormHeight} activeBabyEditForms={activeBabyEditForms} setActiveBabyEditForms={setActiveBabyEditForms} />
                })}
              </ul>
            }
          </>
        )}
      {(!isLoading && !newBabyFormHeight && activeBabyEditForms.length === 0) && <button onClick={() => toggleBabyFormExpand()} className="account-panel-cta-btn btn secondary">Add New Baby</button>}
      <Expand open={newBabyFormHeight !== 0} duration={300}>
        <MyBabyForm type={'new'} toggleExpand={toggleBabyFormExpand} onUpdateBabyInfo={onUpdateBabyInfo} />
      </Expand>
    </div>
  );
};

export default MyBaby;