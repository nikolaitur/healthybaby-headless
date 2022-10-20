import { nacelleClient } from 'services'
import ContentSections from '@/components/Sections/ContentSections'

export default function DynamicPage({ page, handle }) {
  console.log("page:", page)
  const sections = page.fields.sections

  return (
    <div className={`standard-page standard-page--${handle}`}>
      <ContentSections sections={sections} />
    </div>
  )
}

export async function getStaticPaths() {
  const basicPages = await nacelleClient.content({
    type: 'page'
  })

  const handles = [...basicPages].map((page) => ({ params: { handle: page.handle } }))

  return {
    paths: handles,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {

  const pages = await nacelleClient.content({
    handles: [params.handle],
    type: 'page',
  })

  if (!pages.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      page: pages[0],
      handle: params.handle
    }
  }

}
