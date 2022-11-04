import { useState, useEffect, useCallback } from 'react'
import { nacelleClient } from 'services'
import { useRouter } from 'next/router'
import { useCustomerContext } from '@/context/CustomerContext'
import { GET_PRODUCTS } from 'gql'
import _ from 'lodash'

import ProductCard from '../../Cards/ProductCard'
import CloseIcon from '../../../svgs/close-icon.svg'

import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)

const SearchMenu = ({
  searchQuery,
  setSearchQuery,
  setSearchOpen,
  isSearchOpen,
}) => {
  const router = useRouter()
  const { customer } = useCustomerContext()
  const [searchProducts, setSearchProducts] = useState({ hits: [], total: 0 })

  const performSearch = (_searchVal) => {
    const queries = [
      {
        indexName: 'shopify_products',
        query: _searchVal,
        params: {
          hitsPerPage: 4,
        },
      },
    ]

    if (_searchVal == '') {
      setSearchProducts([])
      document.body.classList.remove('searchmenu-is-active')
      return
    }

    searchClient.multipleQueries(queries).then(({ results }) => {
      if (!results[0]) {
        setSearchProducts([])
        document.body.classList.remove('searchmenu-is-active')
      } else {
        nacelleClient.query({
          query: GET_PRODUCTS,
          variables: {
            "filter": {
              "handles": results[0].hits.map((product) => product.Handle),
            }
          }
        }).then(({products}) => {
            if (products.length) {
              setSearchProducts(products)
              document.body.classList.add('searchmenu-is-active')
            }
          })
      }
    })
  }

  const debounce = useCallback(
    _.debounce((_searchVal) => {
      performSearch(_searchVal)
    }, 500),
    []
  )

  useEffect(() => debounce(searchQuery), [searchQuery])

  useEffect(() => {
    const onRouteChangeComplete = () => {
      setSearchQuery('')
      setSearchOpen(false)
      document.body.classList.remove('searchmenu-is-active')
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete)
  }, [router.pathname])

  const closeSearchMenu = () => {
    setSearchQuery('')
    setSearchOpen(false)
    document.body.classList.remove('searchmenu-is-active')
  }

  if (router.pathname === '/search') {
    return ''
  }

  return (
    <div className={`search ${searchQuery.length > 0 ? 'show' : ''}`}>
      <div className={`search-menu`}>
        <div className="search-menu__container container">
          <div className="search-menu__close" onClick={() => closeSearchMenu()}>
            <CloseIcon />
          </div>
          <div className="search-menu__products">
            <div className="search-menu__header">Top Products</div>
            <div className="search-menu__wrapper">
              {searchProducts.length > 0
                ? searchProducts.map((product, index) => (
                    <ProductCard product={product} key={index} index={index} sizes="600px" />
                  ))
                : ''}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`search-menu__overlay ${
          searchQuery.length > 0 || isSearchOpen ? 'show' : ''
        }`}
        onClick={() => closeSearchMenu()}
      ></div>
    </div>
  )
}

export default SearchMenu
