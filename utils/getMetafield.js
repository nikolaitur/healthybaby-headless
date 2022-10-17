export const getMetafield = ({metafields, namespace, key, returnValue}) => {
  if (metafields.length === 0) {
    return undefined
  }
  if (returnValue && metafields.find(metafield => metafield.key === key && metafield.namespace === namespace)) {
    return JSON.parse(metafields.find(metafield => metafield.key === key && metafield.namespace === namespace).value)
  }
  return metafields.find(metafield => metafield.key === key && metafield.namespace === namespace)
}