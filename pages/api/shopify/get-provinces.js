/* /api/shopify */
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
  accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
});


export default async function handler(req, res) {
  const { countryId } = JSON.parse(req.body)

  shopify.province.list(countryId)
    .then((response) => {
      res.status(201).json({ message: 'success', data: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'error', data: err });
    });
};