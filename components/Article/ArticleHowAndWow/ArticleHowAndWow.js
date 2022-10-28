import React from 'react'
import BlinkingStar from '../../../svgs/blinking-star.svg'
import parse from 'html-react-parser'

const ArticleHowAndWow = ({ content }) => {
  const { title } = { ...content.fields }
  return (
    <div className="article-howandwow">
      <div className="article-howandwow__title">
        <span>{parse(title)}</span>
        <span className="star">
          <BlinkingStar />
        </span>
      </div>
    </div>
  )
}

export default ArticleHowAndWow
