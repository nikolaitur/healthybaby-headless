import { nacelleClient } from 'services'

import CollectionGrid from '../../components/Sections/CollectionGrid'
import CollectionHeader from '../../components/Sections/CollectionHeader'

function Collection(props) {
  const { collection } = props

  return (
      <>
        <CollectionHeader content={collection} />
        <CollectionGrid content={collection} />
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