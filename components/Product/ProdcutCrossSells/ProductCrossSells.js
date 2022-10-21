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

import CollectionProductCard from '../../Cards/CollectionProductCard'
import CollectionSections from '@/components/Sections/CollectionSections'

const ProductCrossSells = ({ content, product }) => {
  const [products, setProducts] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      let productId = product.sourceEntryId
        .split('gid://shopify/Product/')
        .pop()
      axios
        .post('/api/shopify/get-recommended-products', {
          product: 8032012370160,
          limit: 3,
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })

      const productHandles = content.fields.sections
        .filter((section) => {
          if (section.fields.productHandle) return section
        })
        .map((section) => section.fields.productHandle.replace('::en-US', ''))

      const productsData = await nacelleClient.products({
        handles: productHandles,
      })

      setProducts(productsData)

      console.log(productsData)
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
        {content.fields?.sections && products ? (
          <>
            <div className="product-cross-sells__items">
              {content.fields.sections.map((item, index) => {
                return (
                  <CollectionProductCard
                    content={item}
                    key={index}
                    products={products}
                    crossSell={true}
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
              {content.fields.sections.map((item, index) => (
                <SwiperSlide key={index}>
                  <CollectionProductCard
                    content={item}
                    key={index}
                    products={products}
                    crossSell={true}
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
