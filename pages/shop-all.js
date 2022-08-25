import React, {useState, useEffect} from 'react'
import { nacelleClient } from 'services'

import CollectionGrid from '../components/Sections/CollectionGrid'
import VitaminFinder from '../components/Cards/VitaminFinder'
import DiaperFinderCard from '../components/Cards/DiaperFinderCard'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


export default function ShopAll({ pages }) {
    console.log(pages[0].fields)

    const shopAllSections = pages[0].fields.sections

  return (
    <>
        <div className="shop-all">
            <section className="collection-header">

            </section>

            {/* TO do Add swtich to apply different section types */}
            {shopAllSections.map((section, index) => {
                return <CollectionGrid content={section} key={index} />
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