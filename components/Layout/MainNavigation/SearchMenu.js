import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useRouter } from 'next/router'
import { dataLayerViewSearchResults } from '@/utils/dataLayer'

import ProductCard from '../../Cards/ProductCard'
import CloseIcon from '../../../svgs/close-icon.svg'

import algoliasearch from 'algoliasearch'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALOGLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALOGLIA_WRITE_API_KEY
)

const SearchMenu = ({ searchQuery, setSearchQuery, setSearchOpen, isSearchOpen }) => {
  const router = useRouter()
  const [searchProducts, setSearchProducts] = useState({ hits: [], total: 0 })

  const queries = [
    {
      indexName: 'shopify_products',
      query: searchQuery,
      params: {
        hitsPerPage: 4,
      },
    }
  ]

  useEffect(() => {
    searchClient.multipleQueries(queries).then(({ results }) => {
      if (searchQuery == '') {
        setSearchProducts([])
        document.body.classList.remove('searchmenu-is-active')
      } else if (!results[0]) {
        setSearchProducts([])
        document.body.classList.remove('searchmenu-is-active')
      } else {
        dataLayerViewSearchResults({ products: results[0].hits })
        nacelleClient.products({
          handles: results[0].hits.map(product => product.Handle)
        }).then(products => {
          if (products.length) {
            setSearchProducts(products)
            document.body.classList.add('searchmenu-is-active')
          }
        })
      }
    })
  }, [searchQuery])

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
                    <ProductCard product={product} key={index} sizes="600px" />
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
