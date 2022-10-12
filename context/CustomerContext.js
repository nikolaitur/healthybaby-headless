import { createContext, useContext, useState, useEffect } from 'react'
import { accountClientPost } from '../utils/account'
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_ACCESS_TOKEN_DELETE, GET_CUSTOMER, CUSTOMER_CREATE, CUSTOMER_ADDRESS_CREATE, CUSTOMER_ADDRESS_UPDATE, CUSTOMER_ADDRESS_DELETE, CUSTOMER_DEFAULT_ADDRESS_UPDATE, CUSTOMER_RECOVER, CUSTOMER_RESET, GET_CUSTOMER_ORDERS, transformEdges, transformOrders } from '../gql/index.js'
import { Multipass } from "multipass-js"

const multipass = new Multipass(process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_MULTIPASS_SECRET)
import * as Cookies from 'es-cookie'

const CustomerContext = createContext()

export function useCustomerContext() {
  return useContext(CustomerContext)
}

export function CustomerProvider({ children }) {

  const [customer, setCustomer] = useState(null)
  const [customerLoading, setCustomerLoading] = useState(true)

  useEffect(() => {
    const customerAccessToken = Cookies.get('customerAccessToken')
    if (customerAccessToken) {
      getCustomer({ accessToken: customerAccessToken })
    } else {
      setCustomerLoading(false)
    }
  }, [])

  async function createCustomerAccessToken({ email, password }) {
    const response = await accountClientPost({
      query: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: {
        input: {
          email,
          password
        }
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { customerAccessTokenCreateErrors: errors }
    }
    return { customerAccessTokenCreate: data.customerAccessTokenCreate }
  }

  async function getCustomer({accessToken, expiresAt, enableLoadingState = true}) {
    if (enableLoadingState) {
      setCustomerLoading(true)
    }
    const response = await accountClientPost({
      query: GET_CUSTOMER,
      variables: {
        customerAccessToken: accessToken
      }
    })
    const { data, errors } = response

    if (errors && errors.length) {
      return { errors: errors }
    }

    if (data?.customer && expiresAt) {
      Cookies.set('customerAccessToken', accessToken, { expires: new Date(expiresAt), path: '/' })
    }

    const { customer } = data
    const multipassRedirectURL = multipass.withCustomerData({email: customer.email}).withDomain('healthybaby-dev.myshopify.com').url();

    if (customer?.addresses?.edges.length > 0) {
      customer.addresses = transformEdges(customer.addresses)
      customer.shopify_login_redirect_url = multipassRedirectURL
    }

    const orders = await getCustomerOrders({accessToken})

    if (!orders.errors?.length) {
      customer.orders = orders
    }

    if (customer?.metafields.edges.length > 0) {
      customer.metafields = transformEdges(customer.metafields)
    } else {
      customer.metafields = []
    }

    if (enableLoadingState) {
      setCustomerLoading(false)
    }

    setCustomer(customer)
    console.log("customer:", customer)
    return { data }
  }

  async function login({ email, password }) {
    const { customerAccessTokenCreateErrors, customerAccessTokenCreate } = await createCustomerAccessToken({email, password})
    if (customerAccessTokenCreateErrors) {
      return { errors: customerAccessTokenCreateErrors }
    }
    if (customerAccessTokenCreate.userErrors.length) {
      return { errors: customerAccessTokenCreate.userErrors }
    }
    const customerAccessToken = customerAccessTokenCreate.customerAccessToken
    return getCustomer({
      accessToken: customerAccessToken.accessToken,
      expiresAt: customerAccessToken.expiresAt
    })
  }

  async function logout() {
    const customerAccessToken = Cookies.get('customerAccessToken')
    const response = await accountClientPost({
      query: CUSTOMER_ACCESS_TOKEN_DELETE,
      variables: { customerAccessToken: customerAccessToken }
    })
    const { deletedAccessToken, userErrors } = {...response.data.customerAccessTokenDelete}
    if (deletedAccessToken) {
      setCustomer(null)
      Cookies.remove('customerAccessToken')
    }
    return { deletedAccessToken, errors: userErrors }
  }

  async function register({ firstName, lastName, email, password}) {
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

  async function getCustomerOrders({accessToken = Cookies.get('customerAccessToken')}) {
    const response = await accountClientPost({
      query: GET_CUSTOMER_ORDERS,
      variables: {
        customerAccessToken: accessToken
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { errors: errors }
    }
    const orders = transformOrders(data.customer.orders)
    // TODO: check if customer without orders returns error
    return orders
  }

  async function updateBabyInformation({customer, metafields, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await fetch('/api/shopify/update-baby-info', {
      method: 'POST',
      body: JSON.stringify({
        variables: {
          input: {
            id: customer.id,
            metafields
          }
        }
      })
    })
    .then(response => response.json())
    if (response && response.message === 'error') {
      console.log("response:", response)
      return response.data.errors
    }
    if (response && response.message === 'success') {
      return getCustomer({
        accessToken: accessToken,
        enableLoadingState: false
      })
    }
    return response
  }

  async function createBabyMetafields({metafields, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await fetch('/api/shopify/create-baby-metafields', {
      method: 'POST',
      body: JSON.stringify({
        variables: {
          metafields
        }
      })
    })
    .then(response => response.json())
    if (response && response.message === 'error') {
      console.log("response:", response)
      return response.data.errors
    }
    if (response && response.message === 'success') {
      return getCustomer({
        accessToken: accessToken,
        enableLoadingState: false
      })
    }
    return response
  }

  async function addAddress({address, defaultAddressIsChecked, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await accountClientPost({
      query: CUSTOMER_ADDRESS_CREATE,
      variables: {
        customerAccessToken: accessToken,
        address
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { errors: errors }
    }

    if (defaultAddressIsChecked) {
      console.log("setting as default:", data.customerAddressCreate.customerAddress.id)
      await setAsDefaultAddress({
        accessToken,
        addressId: data.customerAddressCreate.customerAddress.id
      })
    }

    return getCustomer({
      accessToken: accessToken,
      enableLoadingState: false
    })
  }

  async function updateAddress({address, addressId, defaultAddressIsChecked, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await accountClientPost({
      query: CUSTOMER_ADDRESS_UPDATE,
      variables: {
        customerAccessToken: accessToken,
        address,
        id: addressId
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { errors: errors }
    }


    console.log("setting as default:", addressId)
    if (defaultAddressIsChecked) {
      await setAsDefaultAddress({
        accessToken,
        addressId
      })
    }

    return getCustomer({
      accessToken: accessToken,
      enableLoadingState: false
    })
  }

  async function deleteAddress({addressId, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await accountClientPost({
      query: CUSTOMER_ADDRESS_DELETE,
      variables: {
        customerAccessToken: accessToken,
        id: addressId
      }
    })
    const { data, errors } = response
    if (errors && errors.length) {
      return { errors: errors }
    }
    return getCustomer({
      accessToken: accessToken,
      enableLoadingState: false
    })
  }

  async function setAsDefaultAddress({addressId, accessToken = Cookies.get('customerAccessToken')}) {
    const response = await accountClientPost({
      query: CUSTOMER_DEFAULT_ADDRESS_UPDATE,
      variables: {
        customerAccessToken: accessToken,
        addressId
      }
    })
    const { data, errors } = response

    console.log(data, errors)

    if (errors && errors.length) {
      return { errors: errors }
    }
    return getCustomer({
      accessToken: accessToken,
      enableLoadingState: false
    })
  }

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, customerLoading, register, login, logout, getCustomerOrders, createBabyMetafields, updateBabyInformation, addAddress, updateAddress, deleteAddress, setAsDefaultAddress }}>
      {children}
    </CustomerContext.Provider>
  )
}