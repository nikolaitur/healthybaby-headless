import { useState } from 'react'

import { nacelleClient } from 'services'
import Head from 'next/head'

import ArticleHeroEverGreen from '../../../components/Article/ArticleHeroEverGreen'
import ArticleSocial from '../../../components/Article/ArticleSocial'
import ArticleSectionsContent from '../../../components/Article/ArticleSectionsContent'
import ArticlePrevNext from '../../../components/Article/ArticlePrevNext'

function Article({ article }) {
  const pageTitle = `${article.title} – Healthybaby`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="title"
          content={
            article.fields.metaTitle ? article.fields.metaTitle : pageTitle
          }
        />
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
        <article className="article">
          {article.fields.articleHero ? (
            <ArticleHeroEverGreen content={article} />
          ) : (
            <></>
          )}
          <div className="article__container article-content__container">
            <ArticleSocial key="social" />
            <div>
              {article.fields.articleSections ? (
                <ArticleSectionsContent
                  sections={article.fields.articleSections}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          {article.fields.articlePagination ? (
            <ArticlePrevNext
              content={article.fields.articlePagination}
              key="articlePagination"
            />
          ) : (
            <></>
          )}
        </article>
      </>
    </>
  )
}

export default Article

export async function getStaticPaths() {
  const articles = await nacelleClient.content({ type: 'article' })

  const handles = articles
    .filter((article) => article.fields.articleType === 'Article')
    .filter((article) => article.handle)
    .map((article) => ({ params: { handle: article.handle } }))

  return {
    paths: handles,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const articles = await nacelleClient.content({ handles: [params.handle] })

  if (!articles.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: articles[0],
    },
  }
}
