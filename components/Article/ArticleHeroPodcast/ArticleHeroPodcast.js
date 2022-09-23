import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const ArticleHeroPodcast = ({ content }) => {
  return (
    <div
      className="podcast-hero"
      style={{
        background:
          'linear-gradient(180deg, #D6E9E5 0%, rgba(240, 227, 229, 0) 100%)',
      }}
    >
      <div className="container podcast-hero__content">
        <div className="podcast-hero__image">
          <div className="podcast-hero__image--desktop">
            <Image
              className=""
              src={`https://images.ctfassets.net/urdrzzac4igp/53rLh7AGXQVR2AW0DF4iTq/9f996b64bb25d31dbac5d6f994981117/Mask_group__20_.png`}
              alt={`image`}
              layout="responsive"
              objectFit="cover"
              height="700"
              width="650"
            />
          </div>
        </div>
        <div className="podcast-hero__info">
          <div className="podcast-hero__breadcrumbs">
            <Link href="/">
              <div className="podcast-hero__breadcrumb">
                <span>Home /{`\u00A0`}</span>
              </div>
            </Link>
            <Link href="/">
              <div className="podcast-hero__breadcrumb">
                <span> Breadcrumb</span>
              </div>
            </Link>
          </div>
          <h3 className="podcast-hero__title">{content.fields.title}</h3>
          <div className="podcast-hero__written">
            With <span className="name">Minnie Driver +</span>&nbsp;&nbsp;
            <span className="name">Dr.Aliza Pressman</span>
          </div>
          <div className="podcast-hero__image">
            <div className="podcast-hero__image--mobile">
              <Image
                className=""
                src={`https://images.ctfassets.net/urdrzzac4igp/53rLh7AGXQVR2AW0DF4iTq/9f996b64bb25d31dbac5d6f994981117/Mask_group__20_.png`}
                alt={`image`}
                layout="responsive"
                objectFit="cover"
                height="700"
                width="650"
              />
            </div>
          </div>
          <div className="podcast-hero__iheart">
            <iframe
              allow="autoplay"
              width="100%"
              height="200"
              src="https://www.iheart.com/podcast/1119-the-healthy-baby-show-93537285/episode/what-i-wish-i-had-known-97464635/?embed=true"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroPodcast
