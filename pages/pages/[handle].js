import { nacelleClient } from 'services'
import Head from 'next/head'

import ContentSections from '@/components/Sections/ContentSections'

export default function DynamicPage({ page, handle }) {
  const sections = page.fields.sections
  const pageTitle = `${page.title} – Healthybaby`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={
            article.fields.metaDescription
              ? article.fields.metaDescription
              : 'the safest, organic essentials for your baby &amp; the planet &ndash; Healthybaby'
          }
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            article.fields.ogImage?.fields?.file.url
              ? 'https:' + article.fields.ogImage.fields.file.url
              : ''
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className={`standard-page standard-page--${handle}`}>
          <ContentSections sections={sections} />
        </div>
      </>
    </>
  )
}

export async function getStaticPaths() {
  const basicPages = await nacelleClient.content({
    type: 'page',
  })

  const handles = [...basicPages].map((page) => ({
    params: { handle: page.handle },
  }))

  return {
    paths: handles,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const pages = await nacelleClient.content({
    handles: [params.handle],
    type: 'page',
  })

  if (!pages.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: pages[0],
      handle: params.handle,
    },
  }
}
