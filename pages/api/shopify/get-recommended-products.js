import axios from 'axios'

export default async (req, res) => {
  const {
    body: { product, limit },
  } = req

  let url = `https://${process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN}/recommendations/products.json?product_id=${product}&limit=${limit}`

  axios
    .get(url)
    .then((response) => {
      res.status(200).json({ message: 'success', data: response.data })
    })
    .catch((err) => {
      res.status(400).json({ message: 'error', data: err })
    })
}
