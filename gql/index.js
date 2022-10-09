export const transformEdges = (object, field) => {
  if (field == null) {
    return object.edges.map((edge) => {
      return edge.node
    })
  } else {
    return object.edges.map((edge) => {
      return edge.node[field]
    })
  }
}

export const transformOrder = (order) => {
  const { discountApplications, lineItems, ...rest } = order
  const transformedOrder = {
    discountApplications: discountApplications
      ? transformEdges(discountApplications)
      : [],
    lineItems: lineItems ? transformEdges(lineItems) : [],
    ...rest
  }

  return transformedOrder
}

export const transformOrders = (orders) => {
  const edges = transformEdges(orders)
  const transformedOrders = edges.map(transformOrder)

  return transformedOrders
}

export const CUSTOMER_ACCESS_TOKEN_CREATE = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    userErrors {
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}`

export const CUSTOMER_ACCESS_TOKEN_DELETE = `mutation customerAccessTokenDelete($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
    }
  }
}`

export const GET_CUSTOMER = `query getCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    email
    acceptsMarketing
    createdAt
    updatedAt
    displayName
    lastName
    firstName
    phone
    tags
    defaultAddress {
      address1
      address2
      city
      company
      country
      countryCodeV2
      firstName
      formatted
      formattedArea
      id
      lastName
      latitude
      longitude
      name
      phone
      province
      provinceCode
      zip
    }
    addresses (first: 50) {
      edges {
        node {
          address1
          address2
          city
          company
          country
          countryCodeV2
          firstName
          formatted
          formattedArea
          id
          lastName
          name
          phone
          province
          provinceCode
          zip
        }
      }
    }
  }
}`

export const CUSTOMER_ADDRESS_CREATE = `mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
  customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
    customerAddress {
      address1
      address2
      city
      company
      country
      countryCodeV2
      firstName
      formatted
      formattedArea
      id
      lastName
      latitude
      longitude
      name
      phone
      province
      provinceCode
      zip
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const CUSTOMER_ADDRESS_UPDATE = `mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
  customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
    customerAddress {
      address1
      address2
      city
      company
      country
      countryCodeV2
      firstName
      formatted
      formattedArea
      id
      lastName
      latitude
      longitude
      name
      phone
      province
      provinceCode
      zip
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const CUSTOMER_ADDRESS_DELETE = `mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
  customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
    customerUserErrors {
      code
      field
      message
    }
    deletedCustomerAddressId
  }
}`

export const CUSTOMER_DEFAULT_ADDRESS_UPDATE = `mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const CUSTOMER_CREATE = `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const CUSTOMER_RECOVER = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const CUSTOMER_RESET = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
  customerReset(id: $id, input: $input) {
    customer {
      id
      email
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const GET_PRODUCTS = `query products($filter: ProductFilterInput) {
  products(filter: $filter){
    nacelleEntryId
    sourceEntryId
    sourceId
    availableForSale
    productType
    tags
    metafields {
      id
      key
      namespace
      value
    }
    content {
      nacelleEntryId
      sourceEntryId
      sourceId
      handle
      title
      description
      metafields {
        namespace
        value
        key
      }
      options {
        name
        values
      }
      featuredMedia {
        altText
        id
        src
        thumbnailSrc
        type
      }
      media {
        id
        src
        thumbnailSrc
        altText
      }
    }
    variants {
      nacelleEntryId
      sourceEntryId
      sku
      availableForSale
      price
      compareAtPrice
      weight
      productHandle
      quantityAvailable
      metafields {
        namespace
        value
        key
      }
      content {
        title
        variantEntryId
        selectedOptions {
          name
          value
        }
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
      }
    }
  }
}`;

export const GET_CUSTOMER_ORDERS = `query getCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    orders (first: 25) {
      edges {
        node {
          discountApplications (first: 25) {
            edges {
              node {
                allocationMethod
                value {
                  __typename
                }
                targetType
                targetSelection
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
          lineItems (first: 25) {
            edges {
              node {
                customAttributes {
                  key
                  value
                }
                discountAllocations {
                  allocatedAmount {
                    amount
                    currencyCode
                  }
                  discountApplication {
                    allocationMethod
                    targetSelection
                    targetType
                  }
                }
                discountedTotalPrice {
                  amount
                  currencyCode
                }
                originalTotalPrice {
                  amount
                  currencyCode
                }
                variant {
                  availableForSale
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  id
                  image {
                    altText
                    id
                    originalSrc
                    transformedSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                  }
                  requiresShipping
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                  weight
                  weightUnit
                }
                quantity
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
          currencyCode
          customerLocale
          customerUrl
          email
          id
          name
          orderNumber
          phone
          canceledAt
          processedAt
          fulfillmentStatus
          financialStatus
          shippingAddress {
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            formatted
            formattedArea
            id
            lastName
            latitude
            longitude
            name
            phone
            province
            provinceCode
            zip
          }
          shippingDiscountAllocations {
            allocatedAmount {
              amount
              currencyCode
            }
            discountApplication {
              allocationMethod
              targetSelection
              targetType
              value {
                __typename
              }
            }
          }
          statusUrl
          subtotalPriceV2 {
            amount
            currencyCode
            __typename
          }
          successfulFulfillments {
            trackingInfo {
              number
              url
            }
            fulfillmentLineItems (first: 25) {
              edges {
                node {
                  lineItem {
                    customAttributes {
                      key
                      value
                    }
                    variant {
                      id
                    }
                  }
                  quantity
                }
                cursor
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
            }
          }
          totalPriceV2 {
            amount
            currencyCode
          }
          totalRefundedV2 {
            amount
            currencyCode
          }
          totalShippingPriceV2 {
            amount
            currencyCode
          }
          totalTaxV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`