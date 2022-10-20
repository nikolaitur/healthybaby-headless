import { nacelleClient } from 'services'
import Link from 'next/link';
import Head from 'next/head'

export default function Custom404({ page }) {
    const { header, subheader, description } = {...page.fields}
    return (
      <>
        <Head>
          <title>404 Page Not Found &ndash; Healthybaby</title>
          <meta name="description" content="the safest, organic essentials for your baby &amp; the planet &ndash; Healthybaby" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <section className="page-404">
              <div className="page-404__container container">
                  <h6>{subheader}</h6>
                  <h3>{header}</h3>
                  <h4>{description}</h4>
                  {page.fields?.ctaText && page.fields?.ctaUrl ? 
                      <Link href={page.fields.ctaUrl}>
                          <button className="page-404__button btn secondary">
                              <span>{ page.fields.ctaText }</span>
                          </button>
                      </Link>
                  : ""}
              </div>
          </section>
        </>
      </>
    )
}

export async function getStaticProps({ params }) {
    const pages = await nacelleClient.content({
      handles: ["page-404"]
    })
  
    return {
      props: {
        page: pages[0]
      }
    } 
}