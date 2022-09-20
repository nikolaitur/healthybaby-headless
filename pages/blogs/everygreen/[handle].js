import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'
import styles from 'styles/Product.module.css'

import ArticleHeroEveryGreen from '../../../components/Article/ArticleHeroEveryGreen'
import ArticleContent from '../../../components/Article/ArticleContent'
import ArticleVideo from '../../../components/Article/ArticleVideo'
import ArticleSources from '../../../components/Article/ArticleSources'
import ArticleTags from '../../../components/Article/ArticleTags'
import ArticleRelated from '../../../components/Article/ArticleReleated'

function Article({ article }) {

  return (
        <article className="article">
            <div className="article__container">
                <ArticleHeroEveryGreen />
                <ArticleContent content={true}/>
                <ArticleVideo />
                <ArticleContent content={false}/>
                <ArticleSources />
                <ArticleTags />
            </div>
            <ArticleRelated />
        </article>
  )
}

export default Article

export async function getStaticPaths() {
    // Performs a GraphQL query to Nacelle to get product handles.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    //   const results = await nacelleClient.query({
    //     query: HANDLES_QUERY,
    //   })
    //   const handles = results.products
    //     .filter((product) => product.content?.handle)
    //     .map((product) => ({ params: { handle: product.content.handle } }))

    return {
        paths: [{ params: { handle: "test-1 "} }],
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {
    // Performs a GraphQL query to Nacelle to get product data,
    // using the handle of the current page.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    //   const { products } = await nacelleClient.query({
    //     query: PAGE_QUERY,
    //     variables: { handle: params.handle },
    //   })

    //   if (!products.length) {
    //     return {
    //       notFound: true,
    //     }
    //   }

    return {
        props: {
            article: []
        },
    }
}
