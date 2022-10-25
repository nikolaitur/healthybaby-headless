import React from 'react'
import ArticleContent from '../../../components/Article/ArticleContent'
import ArticleShop from '../../../components/Article/ArticleShop'
import ArticleVideo from '../../../components/Article/ArticleVideo'
import ArticleSources from '../../../components/Article/ArticleSources'
import ArticleTags from '../../../components/Article/ArticleTags'
import ArticleRelated from '../../../components/Article/ArticleReleated'
import ArticlePullQuote from '../../../components/Article/ArticlePullQuote'
import ArticleBanner1 from '../../../components/Article/ArticleBanner1'
import ArticleBanner2 from '../../../components/Article/ArticleBanner2'
import ArticleAuthorSpotlight from '../../../components/Article/ArticleAuthorSpotlight'
import ArticleHowAndWow from '../../../components/Article/ArticleHowAndWow'
import ArticleActivityHeader from '../../../components/Article/ArticleActivityHeader'

const ArticleSectionsContent = ({ sections }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  console.log(sections)
  return (
    <>
      {sections.map((section, index) => {
        const type = section.type

        switch (type) {
          case 'articleContent':
            return <ArticleContent content={section} key={index} />
          case 'articlePullQuote':
            return <ArticlePullQuote content={section} key={index} />
          case 'articleShop':
            return <ArticleShop content={section} key={index} />
          case 'articleVideo':
            return <ArticleVideo content={section} key={index} />
          case 'articleSource':
            return <ArticleSources content={section} key={index} />
          case 'articleBanner1':
            return <ArticleBanner1 content={section} key={index} />
          case 'articleBanner2':
            return <ArticleBanner2 content={section} key={index} />
          case 'authorSpotlight':
            return <ArticleAuthorSpotlight content={section} key={index} />
          case 'articleHowAndWow':
            return <ArticleHowAndWow content={section} key={index} />
          case 'articleActivityHeader':
            return <ArticleActivityHeader content={section} key={index} />

          case 'sectionBreak':
            return (
              <div
                className="section-break"
                key={index}
                style={{
                  marginTop: section.fields.marginTop + 'px',
                  marginBottom: section.fields.marginBottom + 'px',
                }}
              ></div>
            )
          case 'cta':
            return (
              <div
                className={`article-cta ${section.fields.alignment.toLowerCase()}`}
                key={index}
              >
                <a
                  href={section.fields.buttonLink}
                  className={
                    section.fields.buttonOrLink == 'Link'
                      ? 'cta_link'
                      : `btn secondary`
                  }
                >
                  {section.fields.buttonText}
                </a>
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}

export default ArticleSectionsContent
