import React from 'react'

import HeroBanner from '../HeroBanner'
import ContentBanner from '../ContentBanner'

const ContentSections = ({ sections }) => {
//   if (!Array.isArray(sections)) {
//     return null
//   }

//   return sections.map((section) => {
//     const type = section?._type

//     switch (type) {
//       default:
//         return null
//     }
// //   })
// return (
//         <section>Test</section>
//     )
    return sections.map((section, index) => {
        const type = section.type

        switch (type) {
            case 'heroBanner':
            return <HeroBanner content={section} key={index} />
            case 'contentBanner':
            return <ContentBanner content={section} key={index} />
            default:
            return null
        }
    })
}

export default ContentSections
