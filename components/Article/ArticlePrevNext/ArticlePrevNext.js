import React from 'react'
import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import ArrowLeft from '../../../svgs/arrow-left.svg'
import ArrowRight from '../../../svgs/arrow-right.svg'
import ArrowLeftMobile from '../../../svgs/arrow-left-mobile.svg'
import ArrowRightMobile from '../../../svgs/arrow-right-mobile.svg'

const ArticlePrevNext = ({ content }) => {
  const [prevArticle, setPrevArticle] = useState(null)
  const [nextArticle, setNextArticle] = useState(null)

  const updatePrevNextArticles = async () => {
    const prevArticles = await nacelleClient.content({
      handles: [content.fields.prevHandle],
    })
    if (prevArticles.length) {
      setPrevArticle(prevArticles[0])
    }
    const nextArticles = await nacelleClient.content({
      handles: [content.fields.nextHandle],
    })
    if (nextArticles.length) {
      setNextArticle(nextArticles[0])
    }
  }

  useEffect(() => {
    updatePrevNextArticles()
  }, [])

  return (
    <>
      {prevArticle && nextArticle ? (
        <div className="article-prevnext container">
          <a
            href={`/blogs/${prevArticle.fields.articleType}/${prevArticle.handle}`}
            className="article-prevnext__item"
          >
            <div className="article-prevnext__arrow left">
              <span className="mobile">
                <ArrowLeftMobile />
              </span>
              <span className="desktop">
                <ArrowLeft />
              </span>
            </div>
            <div className="article-prevnext__content">
              <label className="desktop">Last Month’s Wow</label>
              <label className="mobile">Previous</label>
              <div className="article-prevnext__title">
                {prevArticle.fields.title}
              </div>
            </div>
          </a>
          <a
            href={`/blogs/${nextArticle.fields.articleType}/${nextArticle.handle}`}
            className="article-prevnext__item"
          >
            <div className="article-prevnext__content">
              <label className="desktop">THE WOW AHEAD</label>
              <label className="mobile">Next</label>
              <div className="article-prevnext__title">
                {nextArticle.fields.title}
              </div>
            </div>
            <div className="article-prevnext__arrow right">
              <span className="mobile">
                <ArrowRightMobile />
              </span>
              <span className="desktop">
                <ArrowRight />
              </span>
            </div>
          </a>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ArticlePrevNext
