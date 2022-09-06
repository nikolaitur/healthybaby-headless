import { nacelleClient } from 'services'

import CollectionHeader from '../../components/Sections/CollectionHeader'
import CollectionGrid from '../../components/Sections/CollectionGrid'
import CollectionSections from '../../components/Sections/CollectionSections'

function Collection(props) {
  const { collection } = props

  console.log(collection)

  return (
      <>
        <CollectionHeader content={collection} />
        <CollectionGrid content={collection} />
        <CollectionSections content={collection} />
      </>
    )
}

export default Collection

export async function getStaticPaths() {
  const collections = await nacelleClient.content({ type: 'collection' })

  const handles = collections
    .filter((collection) => collection.handle)
    .map((collection) => ({ params: { handle: collection.handle } }))

  return {
    paths: handles,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const collection = await nacelleClient.content({ handles: [params.handle] })

  if (!collection.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: collection[0]
    },
  }
}