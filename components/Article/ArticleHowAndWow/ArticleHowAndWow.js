import React from 'react'
import BlinkingStar from '../../../svgs/blinking-star.svg'

const ArticleHowAndWow = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  const { title } = { ...content.fields }
  return (
    <div className="article-howandwow">
      <div className="article-howandwow__title">
        <span>{title}</span>
        <span className="star">
          <BlinkingStar />
        </span>
      </div>
    </div>
  )
}

export default ArticleHowAndWow
