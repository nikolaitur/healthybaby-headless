import React from 'react'
import ICON_FACEBOOK from 'svgs/icon-facebook.svg'
import ICON_TWITTER from 'svgs/icon-twitter.svg'
import ICON_EMAIL from 'svgs/icon-email.svg'

const ArticleSocial = ({ content }) => {
  return (
    <div className="article-social">
      <span className="article-social__share">Share:</span>
      <a href={content.fields.facebookLink}>
        <ICON_FACEBOOK />
      </a>
      <a href={content.fields.twitterLink}>
        <ICON_TWITTER />
      </a>
      <a href={content.fields.mailLink}>
        <ICON_EMAIL />
      </a>
    </div>
  )
}

export default ArticleSocial
