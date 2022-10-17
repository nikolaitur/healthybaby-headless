import React from 'react'
import ICON_FACEBOOK from 'svgs/icon-facebook.svg'
import ICON_TWITTER from 'svgs/icon-twitter.svg'
import ICON_EMAIL from 'svgs/icon-email.svg'

const ArticleSocial = () => {
  const shareNetwork = (network, shareLink = window.location.href) => {
    switch (network) {
      case 'facebook':
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(shareLink) +
            '&title=' +
            document.title,
          '',
          'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=550,width=800'
        )
        break
      case 'twitter':
        window.open(
          'https://twitter.com/share?url=' +
            encodeURIComponent(shareLink) +
            '&text=' +
            document.title,
          '',
          'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=550,width=800'
        )
        break
      case 'email':
        window.location.href = `mailto:?subject=I'd like to share a link with you&body=${shareLink}`
        break
    }
  }

  return (
    <div className="article-social-wrap">
      <div className="article-social">
        <span className="article-social__share">Share:</span>
        <button onClick={() => shareNetwork('facebook')}>
          <ICON_FACEBOOK />
        </button>
        <button onClick={() => shareNetwork('twitter')}>
          <ICON_TWITTER />
        </button>
        <button onClick={() => shareNetwork('email')}>
          <ICON_EMAIL />
        </button>
      </div>
    </div>
  )
}

export default ArticleSocial
