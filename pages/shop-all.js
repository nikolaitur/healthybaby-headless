import React, {useState, useEffect} from 'react'
import { nacelleClient } from 'services'

import CollectionGrid from '../components/Sections/CollectionGrid'
import CollectionHeader from '../components/Sections/CollectionHeader'
import ValueProps from '../components/Sections/ValueProps'

export default function ShopAll({ pages, products }) {
    console.log(pages[0].fields, "Shop All", products)
    const shopAll = pages[0].fields
    const shopAllSections = shopAll.sections

    useEffect(function mount() {
        window.addEventListener("scroll", backgroundColorChange);
    
        return function unMount() {
          window.removeEventListener("scroll", backgroundColorChange);
        };
      });
    
    const backgroundColorChange = () => {
          
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
        const scroll = scrollPosition + (window.innerHeight / 3)
        
        const sections = document.querySelectorAll("section");
        
        sections.forEach(element => {
            if(element.offsetTop <= scroll && element.offsetTop + element.offsetHeight > scroll) {
                const bodyClasses = document.body.className

                for (let i = document.body.classList.length - 1; i >= 0; i--) {
                    const className = document.body.classList[i];
                    if (className.startsWith('color-')) {
                        document.body.classList.remove(className);
                    }
                }

                document.body.classList.add(`color-${element.dataset.backgroundColor}`)
            }
        });
    }

    return (
        <>
            <div className="shop-all">
                <CollectionHeader content={shopAll} />

                {/* TO do Add swtich to apply different section types */}
                {shopAllSections.map((section, index) => {
                    let type = section.type;

                    switch (type) {
                        case 'collection':
                            return <CollectionGrid content={section} products={products} key={index} />
                        case 'valueProps':
                            return <ValueProps content={section} key={index} />
                        default:
                        return null
                    }
                })}
            </div>
        </>
    )
}

export async function getStaticProps({ previewData }) {
  try {
    const pages = await nacelleClient.content({
      handles: ['shop-all']
    })

    let productHandles = []

    if(pages[0].fields.sections) {
        pages[0].fields.sections.map((collection, index) => {
          if(collection.fields.sections) {
            let collectionHandles = collection.fields.sections.filter(section => {
                if (section.fields.productHandle) return section
              }).map(section => section.fields.productHandle.replace('::en-US', ''))

            productHandles.push(collectionHandles)
          }
        })
    }

    const products = await nacelleClient.products({
      handles: productHandles.flat(1)
    })

    if(products.length) {
        return {
          props: { 
            pages,
            products
          }
      }
    }
  } catch {
    // fake hero image section until Sanity is hooked up
    const page = {
      fields: {
          sections: [
            {
              fields: {
                handle: "",
                title: "",
                subtitle: "",
                ctaText: "",
                ctaUrl: "",
                textColor: "",
              }
            }
          ]
      }
    }

    return {
      props: {
        page
      }
    }
  }
}