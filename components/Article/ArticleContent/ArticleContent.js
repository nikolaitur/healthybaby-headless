import React from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useState, useEffect } from 'react'

const ArticleContent = ({ content }) => {
  const [articleContent, setArticleContent] = useState(false)

  console.log("content:", content)

  useEffect(() => {
    const getRichTextToHtml = () => {
      if (content.fields?.richContent) {
        setArticleContent(documentToHtmlString(content.fields.richContent))
      } else {
        setArticleContent('')
      }
    }
    getRichTextToHtml()
  })
  return (
    <div className="article-content">
      {content ? (
        <div
          dangerouslySetInnerHTML={{
            __html: articleContent,
          }}
        ></div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ArticleContent
