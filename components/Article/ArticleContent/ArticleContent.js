import React from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useState, useEffect } from 'react'

const ArticleContent = ({ content }) => {
  const [articleContent, setArticleContent] = useState(false)

  const richTextRenderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (node.data.target?.fields?.file?.url) {
          return `<img src=https:${node.data.target.fields.file.url} />`
        }
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        if (node.data.target?.fields?.file?.url) {
          return `<img src=https:${node.data.target.fields.file.url} />`
        }
      },
    },
  }

  useEffect(() => {
    const getRichTextToHtml = () => {
      if (content.fields?.richContent) {
        setArticleContent(
          documentToHtmlString(
            content.fields.richContent,
            richTextRenderOptions
          )
        )
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
