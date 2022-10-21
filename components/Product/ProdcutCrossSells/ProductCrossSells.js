import React, { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import axios from 'axios'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Lazy, EffectFade } from 'swiper'

import 'swiper/css'
import 'swiper/css/lazy'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import CrossSellProductCard from '../../Cards/CrossSellProductCard'
import CollectionSections from '@/components/Sections/CollectionSections'

const ProductCrossSells = ({ content, product, productBadges }) => {
  const [products, setProducts] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      let productId = product.sourceEntryId
        .split('gid://shopify/Product/')
        .pop()
      axios
        .post('/api/shopify/get-recommended-products', {
          product: productId,
          limit: 3,
        })
        .then(async function (response) {
          const productHandles = response.data?.data?.products?.map(
            (product) => product.handle
          )
          const productsData = await nacelleClient.products({
            handles: productHandles,
          })
          setProducts(productsData)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    getProducts()
  }, [])

  return (
    <div className="product-cross-sells">
      <div className="product-cross-sells__container container">
        {content.fields?.subheader ? (
          <h6 className="product-cross-sells__subheader">
            {content.fields.subheader}
          </h6>
        ) : (
          ''
        )}
        {content.fields?.subheader ? (
          <div
            className="product-cross-sells__header"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(content.fields.header),
            }}
          ></div>
        ) : (
          ''
        )}
        {products ? (
          <>
            <div className="product-cross-sells__items">
              {products.map((product, index) => {
                return (
                  <CrossSellProductCard
                    key={index}
                    product={product}
                    crossSell={true}
                    productBadges={productBadges}
                  />
                )
              })}
            </div>
            <Swiper
              className="product-cross-sells__slider"
              modules={[Lazy]}
              spaceBetween={20}
              slidesPerView={1}
              lazy={true}
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <CrossSellProductCard
                    key={index}
                    product={product}
                    crossSell={true}
                    productBadges={productBadges}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default ProductCrossSells
