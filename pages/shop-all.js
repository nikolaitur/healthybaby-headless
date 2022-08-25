import React, {useState, useEffect} from 'react'
import { nacelleClient } from 'services'

import VitaminFinder from '../components/Cards/VitaminFinder'
import DiaperFinderCard from '../components/Cards/DiaperFinderCard'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ pages }) {
    console.log(pages)
    const vitaminFinder = pages[0].fields.vitaminFinder
    const diaperCalculator = pages[0].fields.diaperCalculator

  return (
    <>
        <div className="shop-all">
            <section className="shop-all__grid">
                <div className="shop-all__container container">
                    <VitaminFinder content={vitaminFinder} />
                    <DiaperFinderCard content={diaperCalculator} />
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
            </section>
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