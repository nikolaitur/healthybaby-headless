import React from 'react'
import BlinkingStar from '../../../svgs/blinking-star.svg'

const ArticleHowAndWow = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-howandwow">
      <div className="article-howandwow__title">
        <span>{content.fields.title}</span>
        <span className="star">
          <BlinkingStar />
        </span>
      </div>
    </div>
  )
}

export default ArticleHowAndWow
