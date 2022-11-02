import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { nacelleClient } from 'services'
import Head from 'next/head'

import CollectionGrid from '../components/Sections/CollectionGrid'
import CollectionHeader from '../components/Sections/CollectionHeader'
import ValueProps from '../components/Sections/ValueProps'
import { useCustomerContext } from '@/context/CustomerContext'

import { dataLayerViewProductList } from '@/utils/dataLayer'

export default function ShopAll({ page, products, productBadges }) {
  const router = useRouter()
  const shopAllSections = page.fields.sections
  const { customer, customerLoading } = useCustomerContext()

  useEffect(() => {
    if (typeof customerLoading === 'boolean' && !customerLoading) {
      setTimeout(
        dataLayerViewProductList({
          customer,
          products: products,
          url: router.asPath,
        }),
        1000
      )
    }
  }, [customerLoading])

  useEffect(function mount() {
    window.addEventListener('scroll', backgroundColorChange)

    return function unMount() {
      window.removeEventListener('scroll', backgroundColorChange)
    }
  })

  const backgroundColorChange = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    const scroll = scrollPosition + window.innerHeight / 3

    const sections = document.querySelectorAll('section')

    sections.forEach((element) => {
      if (
        element.offsetTop <= scroll &&
        element.offsetTop + element.offsetHeight > scroll
      ) {
        const bodyClasses = document.body.className

        for (let i = document.body.classList.length - 1; i >= 0; i--) {
          const className = document.body.classList[i]
          if (className.startsWith('color-')) {
            document.body.classList.remove(className)
          }
        }

        document.body.classList.add(`color-${element.dataset.backgroundColor}`)
      }
    })
  }

  return (
    <>
      <Head>
        <title>
          The Safest Baby Essentials—Diapers, Wipes, Shampoo, Laundry, and More
          &ndash; Healthybaby
        </title>
        <meta
          name="description"
          content="the safest, organic essentials for your baby &amp; the planet &ndash; Healthybaby"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="shop-all">
          <CollectionHeader content={page} />

          {/* TO do Add swtich to apply different section types */}
          {shopAllSections.map((section, index) => {
            let type = section.type

            switch (type) {
              case 'collection':
                return (
                  <CollectionGrid
                    content={section}
                    products={products}
                    key={index}
                    productBadges={productBadges}
                  />
                )
              case 'valueProps':
                return <ValueProps content={section} key={index} />
              default:
                return null
            }
          })}
        </div>
      </>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const pages = await nacelleClient.content({
    handles: ['shop-all'],
  })

  let productHandles = []

  if (pages[0].fields.sections) {
    pages[0].fields.sections.map((collection, index) => {
      if (collection.fields.sections) {
        let collectionHandles = collection.fields.sections
          .filter((section) => {
            if (section.fields.productHandle) return section
          })
          .map((section) => section.fields.productHandle.replace('::en-US', ''))

        productHandles.push(collectionHandles)
      }
    })
  }

  const products = await nacelleClient.products({
    handles: productHandles.flat(1),
  })

  const productBadges = await nacelleClient.content({
    type: 'productBadge',
  })

  if (products.length) {
    return {
      props: {
        page: pages[0],
        products,
        productBadges,
      },
    }
  }
}
