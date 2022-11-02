import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { nacelleClient } from 'services'
import { dataLayerViewProduct } from '@/utils/dataLayer'
import { useCustomerContext } from '@/context/CustomerContext'
import Head from 'next/head'

import ProductGallery from '../../components/Product/ProductGallery'
import ProductInfo from '../../components/Product/ProductInfo'
import ProductSections from '../../components/Product/ProductSections'
import ProductReviews from '../../components/Product/ProductReviews'

function Product({ product, page, productBadges }) {
  const router = useRouter()
  const { customer, customerLoading } = useCustomerContext()
  useEffect(() => {
    if (typeof customerLoading === 'boolean' && !customerLoading) {
      setTimeout(
        dataLayerViewProduct({customer, product: product, url: router.asPath }),
        1000
      )
    }
  }, [customerLoading])

  const pageTitle = `${product.content.title} – Healthybaby`

  return (
    product && (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta
            name="description"
            content="the safest, organic essentials for your baby &amp; the planet &ndash; Healthybaby"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <section className="product-main">
            <div className="product-main__container container">
              <ProductGallery product={product} page={page} />
              <ProductInfo product={product} page={page} />
            </div>
            <ProductSections
              content={page}
              product={product}
              productBadges={productBadges}
            />
            <ProductReviews product={product} />
          </section>
        </>
      </>
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
    handles: [params.handle],
    type: 'product',
  })

  let pageData = pages[0]

  if (!products.length) {
    return {
      notFound: true,
    }
  }

  if (!pages.length) {
    pageData = [
      {
        content: {
          fields: {
            sections: [],
          },
        },
      },
    ]
  }

  const productBadges = await nacelleClient.content({
    type: 'productBadge',
  })

  return {
    props: {
      product: products[0],
      page: pageData,
      productBadges,
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
        quantityAvailable
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
