/* /api/shopify */

import { CUSTOMER_UPDATE_BABY_INFO } from "gql"

export default async function handler(req, res) {

  const { variables } = JSON.parse(req.body)

  fetch(`https://${process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN}/admin/api/2022-10/graphql.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
    },
    method: 'POST',
    body: JSON.stringify({
      query: CUSTOMER_UPDATE_BABY_INFO,
      variables: variables
    })
  })
  .then(response => response.json())
  .then(response => {
    if (response.errors?.length) {
      res.status(400).json({ message: 'error', data: response });
    } else {
      res.status(201).json({ message: 'success', data: response });
    }
  })
  .catch(err => {
    res.status(400).json({ message: 'error', data: err });
  });
}
