import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ChevronUp from '../../../svgs/chevron-up.svg'

const ArticleSources = ({ content }) => {
  const [contentOpen, setContentOpen] = useState(true)
  const { title, articleSources } = {
    ...content.fields,
  }

  const toggleContentOpen = () => {
    setContentOpen(!contentOpen)
  }

  return (
    <div className="article-sources">
      <div className="article-sources__title" onClick={toggleContentOpen}>
        <span>{title}</span>
        <span className={`arrow ${contentOpen ? 'opened' : ''}`}>
          <ChevronUp />
        </span>
      </div>
      <div className={`article-sources__items ${contentOpen ? 'opened' : ''}`}>
        {articleSources.map((articleSourceItem, index) => {
          return (
            <a
              href={articleSourceItem.fields.articleSourceItem}
              target="_blank"
              rel="noreferrer"
              className="article-sources__item"
              key={index}
            >
              {articleSourceItem.fields.articleSourceItem}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ArticleSources
