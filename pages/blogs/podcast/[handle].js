import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'
import styles from 'styles/Product.module.css'

import ArticlePodcast from '../../../components/Article/ArticlePodcast'

function Article({ article }) {
  console.log(article)

  return (
    <article className="article">
      <div className="article__container">
        <ArticlePodcast content={article} />
      </div>
    </article>
  )
}

export default Article

export async function getStaticPaths() {
  const articles = await nacelleClient.content({ type: 'collection' })

  const handles = articles
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
