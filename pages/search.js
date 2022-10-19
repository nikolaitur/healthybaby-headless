import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SearchIcon from '@/svgs/search.svg'
import ProductCard from '@/components/Cards/ProductCard'
import { dataLayerViewSearchResults } from '@/utils/dataLayer'

import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)

const SearchResultsPage = () => {

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState()
  const [searchProducts, setSearchProducts] = useState({ hits: [], total: 0 })

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const productData = (product) => {
    let dataObject = {
      content: {
        title: product['Title'],
        media: [
          {
            src: product['Image Src'],
          },
        ],
      },
    }

    return dataObject
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
        setSearchProducts({ hits: [], total: 0 })
      } else if (!results[0]) {
        setSearchProducts({ hits: [], total: 0 })
      } else {
        dataLayerViewSearchResults({ products: results[0].hits })
        setSearchProducts({ hits: results[0].hits, total: results[0].nbHits })
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
          {searchQuery && <h4>{searchProducts.hits.length} Product{searchProducts.hits.length === 1 ? '' : 's'}</h4>}
          <div className="search-results-page__search-input-wrapper">
            <input
              type="text"
              placeholder="search products, articles, events, etc..."
              onChange={handleSearchChange}
              value={searchQuery}
            />
            <SearchIcon />
          </div>
        </div>
        <div className="search-results-page__main">
          {searchProducts.hits.length > 0
            ? searchProducts.hits.map((product, index) => (
                <ProductCard content={productData(product)} key={index} />
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;