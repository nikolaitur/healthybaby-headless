import HeroBanner from '../HeroBanner'
import ContentBanner from '../ContentBanner'
import CollectionCards from '../CollectionCards'
import DiaperFinder from '../DiaperFinder'
import ShopByCategory from '../ShopByCategory'
import BestSellers from '../BestSellers'
import StoriesSlider from '../StoriesSlider'
import About from '../About'
import WowAndHow from '../WowAndHow'
import FAQGroup from '../FAQGroup'
import ContactForm from '../ContactForm'
import AfterShip from '../AfterShip'
import JazzHR from '../JazzHR'
import Press from '../Press'
import Experts from '../Experts'
import ProductFiftyFifty from '@/components/Product/ProductFiftyFifty'
import ArticleContent from '@/components/Article/ArticleContent'

const ContentSections = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => {
        const type = section.type

        switch (type) {
          case 'heroBanner':
            return <HeroBanner content={section} key={index} />
          case 'contentBanner':
            return <ContentBanner content={section} key={index} />
          case 'categoryCards':
            return <CollectionCards content={section} key={index} />
          case 'diaperFinder':
            return <DiaperFinder content={section} key={index} />
          case 'shopByCategory':
            return <ShopByCategory content={section} key={index} />
          case 'bestSellers':
            return <BestSellers content={section} key={index} />
          case 'storiesSlider':
            return <StoriesSlider content={section} key={index} />
          case 'wowAndHow':
            return <WowAndHow content={section} key={index} />
          case 'about':
            return <About content={section} key={index} />
          case 'faqGroup':
            return <FAQGroup content={section} key={index} />
          case 'contactForm':
            return <ContactForm content={section} key={index} />
          case 'afterShipWidget':
            return <AfterShip content={section} key={index} />
          case 'jazzHrWidget':
            return <JazzHR content={section} key={index} />
          case 'pressBlock':
            return <Press content={section} key={index} />
          case 'experts':
            return <Experts content={section} key={index} />
          case 'productFiftyFifty':
            return <ProductFiftyFifty content={section} key={index} />
          case 'articleContent':
            return <ArticleContent content={section} key={index} />
          default:
            return null
        }
      })}
    </>
  )
}

export default ContentSections
