import React, { useState, useEffect } from 'react'
import { nacelleClient } from 'services'

import ContentSections from '../components/Sections/ContentSections'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ pages }) {
  const sections = pages[0].fields.sections

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
        <title>Healthybaby</title>
        <meta name="description" content="the safest, organic essentials for your baby &amp; the planet &ndash; Healthybaby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <ContentSections sections={sections} />
      </>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  try {
    const pages = await nacelleClient.content({
      handles: ['homepage'],
    })

    return {
      props: { pages },
    }
  } catch {
    // fake hero image section until Sanity is hooked up
    const page = {
      fields: {
        sections: [
          {
            fields: {
              handle: '',
              title: '',
              subtitle: '',
              ctaText: '',
              ctaUrl: '',
              textColor: '',
            },
          },
        ],
      },
    }

    return {
      props: {
        page,
      },
    }
  }
}
