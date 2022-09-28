import React from 'react'

const ArticleContent = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-content">
      {content ? (
        <div
          dangerouslySetInnerHTML={{
            __html: content.content[0].content[0].value,
          }}
        ></div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ArticleContent
