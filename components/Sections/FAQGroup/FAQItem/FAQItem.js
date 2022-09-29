import { useState } from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Expand from 'react-expand-animated'
import IconCaretTop from '@/svgs/caret-top.svg'
import Link from 'next/link'

const FAQItem = ({props}) => {
  const {question, answer} = {...props}
  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
  }

  // find more examples from https://lightrun.com/answers/contentful-rich-text-rendering-rich-text-in-react-native
  const contentfulToReactnative = {
    renderNode: {
      [INLINES.HYPERLINK]: (children) => {
        return <Link href={children?.data?.uri || ''}>
          <a className="link">{children.content[0].value}</a>
        </Link>
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="large">{children}</p>
    },
  }

  return (
    <li className={`faq-item ${height !== 0 ? 'is-expanded' : ''}`}>
      <h4 onClick={() => toggleExpand()}>{question} <IconCaretTop/></h4>
      <Expand open={height !== 0} duration={300}>
        <div className="faq-item__content body-large">
          {documentToReactComponents(answer, contentfulToReactnative)}
        </div>
      </Expand>
    </li>
  )
}

export default FAQItem