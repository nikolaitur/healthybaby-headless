import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import Link from 'next/link'
import Image from 'next/image'
import { dataLayerViewSearchResults } from '@/utils/dataLayer'

import ProductCard from '../../Cards/ProductCard'
import CloseIcon from '../../../svgs/close-icon.svg'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

import algoliasearch from 'algoliasearch'
import Product from 'pages/products/[handle]'
// import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)
const index = searchClient.initIndex('shopify_products')

const SearchMenu = ({ query, toggleSearch, isSearchOpen }) => {
  const [searchState, setSearchState] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const [searchQuery, setSearchQuery] = useState(query)
  const [searchProducts, setSearchProducts] = useState({ hits: [], total: 0 })
  const [searchArticles, setSearchArticles] = useState({ hits: [], total: 0 })

  const queries = [
    {
      indexName: 'shopify_products',
      query: searchQuery,
      params: {
        hitsPerPage: 3,
      },
    },
    {
      indexName: 'articles',
      query: searchQuery,
      params: {
        hitsPerPage: 3,
      },
    },
  ]

  useEffect(() => {
    setSearchQuery(query)
    // console.log(searchQuery, "searchquery")

    searchClient.multipleQueries(queries).then(({ results }) => {
      if (searchQuery == '') {
        setSearchProducts({ hits: [], total: 0 })
        setSearchArticles({ hits: [], total: 0 })
      }

      if (!results[0]) {
        setSearchProducts({ hits: [], total: 0 })
      } else {
        dataLayerViewSearchResults({ products: results[0].hits })
        setSearchProducts({ hits: results[0].hits, total: results[0].nbHits })
      }

      if (!results || !results[1]) {
        setSearchArticles({ hits: [], total: 0 })
      } else {
        setSearchArticles({ hits: results[1].hits, total: results[1].nbHits })
      }

      if (query.length > 0) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }

      // console.log(results, "results", searchProducts.hits, searchArticles.hits);
    })
  }, [query])

  const closeSearchMenu = () => {
    setSearchQuery('')
    toggleSearch()
    // console.log(searchQuery, '2')
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

  return (
    <div className={`search ${query.length > 0 ? 'show' : ''}`}>
      <div className="search-menu__close" onClick={() => closeSearchMenu()}>
        <CloseIcon />
      </div>
      <div className={`search-menu`}>
        <div className="search-menu__container container">
          <div className="search-menu__products">
            <div className="search-menu__header">Top Products</div>
            <div className="search-menu__wrapper">
              {searchProducts.hits.length > 0
                ? searchProducts.hits.map((product, index) => (
                    <ProductCard content={productData(product)} key={index} />
                  ))
                : ''}
            </div>
          </div>

          <div className="search-menu__articles">
            <div className="search-menu__header">Suggested Articles</div>
            <div className="search-menu__wrapper">
              {searchArticles.hits.length > 0
                ? searchArticles.hits.map((article, index) => (
                    <Link href="/" key={index} className="search-menu__link">
                      <div className="search-menu__link">
                        {article.title['en-US']}
                      </div>
                    </Link>
                  ))
                : ''}
            </div>
            <Link href="/">
              <div className="search-menu__result">
                <span>All Results</span>
                <span>
                  <LongArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`search-menu__overlay ${
          query.length > 0 || isSearchOpen ? 'show' : ''
        }`}
        onClick={() => closeSearchMenu()}
      ></div>
    </div>
  )
}

export default SearchMenu
