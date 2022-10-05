import { nacelleClient } from 'services'

import CollectionHeader from '../../components/Sections/CollectionHeader'
import CollectionGrid from '../../components/Sections/CollectionGrid'
import CollectionSections from '../../components/Sections/CollectionSections'

function Collection(props) {
  const { collection, products } = {...props}

  console.log("collection:", collection)
  // console.log("products:", products)

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
  const collections = await nacelleClient.content({ handles: [params.handle] })

  if (!collections.length) {
    return {
      notFound: true,
    }
  }

  if (collections[0].fields.sections) {
    const productHandles = collections[0].fields.sections.filter(section => {
      if (section.fields.productHandle) return section
    }).map(section => section.fields.productHandle)

    console.log("productHandles:", productHandles)

    const products = await nacelleClient.content({
      nacelleEntryIds: productHandles
    })

    console.log("products:", products)

    if (products.length) {
      return {
        props: {
          collection: collection[0],
          products
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