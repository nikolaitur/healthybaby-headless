import { useState } from 'react'
import { nacelleClient } from 'services'

import ArticleHeroPodcast from '../../../components/Article/ArticleHeroPodcast'
import ArticleSocial from '../../../components/Article/ArticleSocial'
import ArticleSectionsContent from '../../../components/Article/ArticleSectionsContent'

function Article({ article }) {
  console.log(article)

  return (
    <article className="article">
      <ArticleHeroPodcast content={article} />
      <div className="article__container article-content__container">
        <ArticleSocial key="social" />
        <div className="article-sectionsContent">
          {article.fields.articleSections ? (
            <ArticleSectionsContent sections={article.fields.articleSections} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </article>
  )
}

export default Article

export async function getStaticPaths() {
  const articles = await nacelleClient.content({ type: 'article' })

  const handles = articles
    .filter((article) => article.fields.articleType === 'podcast')
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
