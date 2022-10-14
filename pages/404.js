import { nacelleClient } from 'services'
import Link from 'next/link';

export default function Custom404({ page }) {
    const { header, subheader, description } = {...page.fields}
    console.log("404 page", page, header)
    return (
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