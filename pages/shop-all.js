import React, {useState, useEffect} from 'react'
import { nacelleClient } from 'services'

import CollectionGrid from '../components/Sections/CollectionGrid'
import CollectionHeader from '../components/Sections/CollectionHeader'
import ValueProps from '../components/Sections/ValueProps'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function ShopAll({ pages }) {
    console.log(pages[0].fields, "Shop All")
    const shopAll = pages[0].fields
    const shopAllSections = shopAll.sections

  return (
    <>
        <div className="shop-all">
            <CollectionHeader content={shopAll} />

            {/* TO do Add swtich to apply different section types */}
            {shopAllSections.map((section, index) => {
                let type = section.type;

                switch (type) {
                    case 'collection':
                        return <CollectionGrid content={section} key={index} />
                    case 'valueProps':
                        return <ValueProps content={section} key={index} />
                    default:
                    return null
                }
            })}
        </div>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  try {
    const pages = await nacelleClient.content({
      handles: ['shop-all']
    })

    return {
      props: { pages }
    }
  } catch {
    // fake hero image section until Sanity is hooked up
    const page = {
      fields: {
          sections: [
            {
              fields: {
                handle: "",
                title: "",
                subtitle: "",
                ctaText: "",
                ctaUrl: "",
                textColor: "",
              }
            }
          ]
      }
    }

    return {
      props: {
        page
      }
    }
  }
}