import { nacelleClient } from 'services'

import CollectionHeader from '../../components/Sections/CollectionHeader'
import CollectionGrid from '../../components/Sections/CollectionGrid'
import CollectionSections from '../../components/Sections/CollectionSections'

function Collection(props) {
  const { collection, products, productBadges } = {...props}

  return (
      <>
        <CollectionHeader content={collection} />
        <CollectionGrid content={collection} products={products} productBadges={productBadges} />
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
  const collections = await nacelleClient.content({ handles: [params.handle] })

  if (!collections.length) {
    return {
      notFound: true,
    }
  }

  if (collections[0].fields.sections) {
    const productHandles = collections[0].fields.sections.filter(section => {
      if (section.fields.productHandle) return section
    }).map(section => section.fields.productHandle.replace('::en-US', ''))

    const products = await nacelleClient.products({
      handles: productHandles
    })

    const productBadges = await nacelleClient.content({
      type: 'productBadge'
    })

    if (products.length) {
      return {
        props: {
          collection: collections[0],
          products,
          productBadges
        },
      }
    }

  }

  return {
    props: {
      collection: collections[0]
    },
  }
}