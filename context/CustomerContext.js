import { createContext, useContext, useState, useEffect } from 'react'
import { accountClientPost } from '../utils/account'
// import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_ACCESS_TOKEN_DELETE, GET_CUSTOMER, CUSTOMER_CREATE, CUSTOMER_RECOVER, CUSTOMER_RESET, transformEdges } from '@/gql/index.js'
import { CUSTOMER_CREATE } from '../gql/index.js'

// import { encode } from 'js-base64'
// import * as Cookies from 'es-cookie'

const CustomerContext = createContext()

export function useCustomerContext() {
  return useContext(CustomerContext)
}

export function CustomerProvider({ children }) {

  const [customer, setCustomer] = useState(null)
  const [customerLoading, setCustomerLoading] = useState(false)

  console.log(accountClientPost)

  async function register({ firstName, lastName, email, password }) {
    const response = await accountClientPost({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password
        }
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { errors: errors }
    }
    const { customerUserErrors } = data.customerCreate
    return { data, errors: customerUserErrors }
  }

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, customerLoading, register }}>
      {children}
    </CustomerContext.Provider>
  )
}