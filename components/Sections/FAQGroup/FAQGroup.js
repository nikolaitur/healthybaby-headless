import { useState } from 'react'
import FAQItem from "./FAQItem"
import parse from 'html-react-parser'

const FAQGroup = ({content}) => {
  const { faqItems, title } = {...content.fields}
  const [visibleItems, setVisibleItems] = useState(faqItems.slice(0, 4))
  const [hideBtn, setHideBtn] = useState(false)

  const viewMore = () => {
    setVisibleItems(faqItems)
    setHideBtn(true)
  }

  return (
    <div className="faq-group container">
      <h3>{parse(title)}</h3>
      <ul className="faq-items">
        {visibleItems.map(item => {
          return <FAQItem props={item.fields} key={item.nacelleEntryId} />
        })}
      </ul>
      {faqItems?.length > 4 && !hideBtn &&
        <button
          onClick={() => viewMore()}
          className="faq-group__view-more-btn link">View More</button>
      }
    </div>
  )
}

export default FAQGroup