import React from 'react'
import ICON_FACEBOOK from 'svgs/icon-facebook.svg'
import ICON_TWITTER from 'svgs/icon-twitter.svg'
import ICON_EMAIL from 'svgs/icon-email.svg'

const ArticleSocial = ({ content }) => {
  const { facebookLink, twitterLink, mailLink } = {
    ...content.fields,
  }
  return (
    <div className="article-social-wrap">
      <div className="article-social">
        <span className="article-social__share">Share:</span>
        <a href={facebookLink}>
          <ICON_FACEBOOK />
        </a>
        <a href={twitterLink}>
          <ICON_TWITTER />
        </a>
        <a href={mailLink}>
          <ICON_EMAIL />
        </a>
      </div>
    </div>
  )
}

export default ArticleSocial
