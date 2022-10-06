import { useState } from 'react'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'

import ProductGallery from '../../components/Product/ProductGallery'
import ProductInfo from '../../components/Product/ProductInfo'
import ProductSections from '../../components/Product/ProductSections'
import ProductReviews from '../../components/Product/ProductReviews'

function Product({ product, page }) {
  const [, { addToCart }] = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedOptions, setSelectedOptions] = useState( selectedVariant.content.selectedOptions)
  const [quantity, setQuantity] = useState(1)

  let options = null
  if (product?.content?.options?.some((option) => option.values.length > 1)) {
    options = product?.content?.options
  }

  const buttonText = selectedVariant
    ? selectedVariant.availableForSale
      ? 'Add To Cart'
      : 'Sold Out'
    : 'Select Option'

  const handleOptionChange = (event, option) => {
    const newOption = { name: option.name, value: event.target.value }
    console.log(newOption)
    const optionIndex = selectedOptions.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name
    })

    const newSelectedOptions = [...selectedOptions]
    if (optionIndex > -1) {
      newSelectedOptions.splice(optionIndex, 1, newOption)
      setSelectedOptions([...newSelectedOptions])
    } else {
      setSelectedOptions([...newSelectedOptions, newOption])
    }
    const variant = getSelectedVariant({
      product,
      options: newSelectedOptions,
    })
    setSelectedVariant(variant ? { ...variant } : null)
  }

  const handleQuantityChange = (event) => {
    setQuantity(+event.target.value)
  }

  // Get product data and add it to the cart by using `addToCart`
  // from the `useCart` hook provided by `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const handleAddItem = () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant,
    })
    addToCart({
      variant,
      quantity,
    })
  }

  return (
    product && (
      <section className="product-main">
        <div className="product-main__container container">
            <ProductGallery product={product} page={page} />
            <ProductInfo product={product} page={page} />
        </div>
        <ProductSections content={page} />
        <ProductReviews product={product} />
      </section>
    )
  )
}

export default Product

export async function getStaticPaths() {
  // Performs a GraphQL query to Nacelle to get product handles.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const results = await nacelleClient.query({
    query: HANDLES_QUERY,
  })
  const handles = results.products
    .filter((product) => product.content?.handle)
    .map((product) => ({ params: { handle: product.content.handle } }))

  return {
    paths: handles,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  // Performs a GraphQL query to Nacelle to get product data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const { products } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle },
  })

  const pages = await nacelleClient.content({
    handles: [params.handle]
  })

  console.log(pages, "pages", params.handle)

  let pageData = pages[0]

  if (!products.length) {
    return {
      notFound: true,
    }
  }

  if(!pages.length) {
      pageData = [
        {
          "content": {
            "fields": {
              "sections": []
            }
          }
        }
      ]
  }

  return {
    props: {
      product: products[0],
      page: pageData
    },
  }
}

// GraphQL query for the handles of products. Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    products {
      content {
        handle
      }
    }
  }
`

// GraphQL query for product content. Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = `
  query ProductPage($handle: String!){
    products(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
        description
        options{
          name
          values
        }
        featuredMedia{
          src
          thumbnailSrc
          altText
        }
        media {
          id
          src
          thumbnailSrc
          altText
        }
			}
      tags
      variants{
        nacelleEntryId
        sourceEntryId
        sku
        availableForSale
        price
        compareAtPrice
        metafields {
          namespace
          value
          key
        }
        content{
          title
          selectedOptions{
            name
            value
          }
          featuredMedia{
            src
            thumbnailSrc
            altText
          }
        }
      }
    }
  }
`
