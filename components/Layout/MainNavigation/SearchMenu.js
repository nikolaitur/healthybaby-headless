import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { dataLayerViewSearchResults } from '@/utils/dataLayer'

import ProductCard from '../../Cards/ProductCard'
import CloseIcon from '../../../svgs/close-icon.svg'

import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)
const index = searchClient.initIndex('shopify_products')

const SearchMenu = ({ query, toggleSearch, isSearchOpen }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchProducts, setSearchProducts] = useState({ hits: [], total: 0 })

  const queries = [
    {
      indexName: 'shopify_products',
      query: searchQuery,
      params: {
        hitsPerPage: 3,
      },
    }
  ]

  useEffect(() => {
    setSearchQuery(query)
    // console.log(searchQuery, "searchquery")

    searchClient.multipleQueries(queries).then(({ results }) => {
      if (searchQuery == '') {
        setSearchProducts({ hits: [], total: 0 })
      }

      if (!results[0]) {
        setSearchProducts({ hits: [], total: 0 })
      } else {
        dataLayerViewSearchResults({ products: results[0].hits })
        setSearchProducts({ hits: results[0].hits, total: results[0].nbHits })
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

  if (router.pathname === '/search') {
    return ''
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
