import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useRouter } from 'next/router'
import SearchIcon from '@/svgs/search.svg'
import ProductCard from '@/components/Cards/ProductCard'
import { dataLayerViewSearchResults } from '@/utils/dataLayer'

import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)

const SearchResultsPage = ({ productBadges }) => {

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState()
  const [searchProducts, setSearchProducts] = useState([])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (router.query?.query) {
      setSearchQuery(router.query.query)
    }
  }, [])

  useEffect(() => {
    const queries = [
      {
        indexName: 'shopify_products',
        query: searchQuery,
      }
    ]
    searchClient.multipleQueries(queries).then(({ results }) => {
      console.log("results:", results)
      if (searchQuery == '') {
        setSearchProducts([])
      } else if (!results[0]) {
        setSearchProducts([])
      } else {
        dataLayerViewSearchResults({ products: results[0].hits })
        nacelleClient.products({
          handles: results[0].hits.map(product => product.Handle)
        }).then(products => {
          if (products.length) {
            setSearchProducts(products)
          }
        })

      }
    })
  }, [searchQuery])

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-results-page__header">
          {searchQuery ? (
            <h1 className="h3">Search results for “{searchQuery}”</h1>
          ):(
            <h1 className="h3">Search results for '...'</h1>
          )}
          {searchQuery && <h4>{searchProducts.length} Product{searchProducts.length === 1 ? '' : 's'}</h4>}
          <div className="search-results-page__search-input-wrapper">
            <input
              type="text"
              placeholder="search products"
              onChange={handleSearchChange}
              value={searchQuery}
            />
            <SearchIcon />
          </div>
        </div>
        <div className="search-results-page__main">
          {searchProducts.length > 0
            ? searchProducts.map((product, index) => (
                <ProductCard product={product} key={index} productBadges={productBadges} showCTA={true} />
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;

export async function getStaticProps({ previewData }) {

  const productBadges = await nacelleClient.content({
    type: 'productBadge',
  })

  return {
    props: {
      productBadges,
    }
  }
}