import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'

import { useHeaderContext } from '../../../context/HeaderContext'

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const MegaMenu = ({ menu, menuColors }) => {
    if (!menu) {
        return ''
    }
    
    const { megaMenuIsOpen, setmegaMenuIsOpen, setMegaMenu, megaMenuFeaturedProducts, setMegaMenuFeaturedProducts } = useHeaderContext()
    const [featuredProducts, setFeaturedProducts] = useState([])
    let backgroundColor = '';

    // setmegaMenuIsOpen(true)

    useEffect(() => {
        getFeaturedProducts()
    }, [megaMenuFeaturedProducts]);

    if (menu) {
        backgroundColor = menu.fields.backgroundColor
        document.documentElement.style.setProperty('--menuItemHover',  menu.fields.hoverColor);
        document.documentElement.style.setProperty('--megaMenuLinkBackground',  menu.fields.backgroundHoverColor);
    }

    const getFeaturedProducts = async () => {
        if(menu.fields.featuredProductsList) {
            const productList = menu.fields.featuredProductsList.split(',')
            await nacelleClient.products({
                handles: productList
            }).then(response => {
                setMegaMenuFeaturedProducts(response)
            })
        }
    }

    const onLinkMouseEnter = (hoverColor, backgroundHoverColor) => {
        document.documentElement.style.setProperty('--menuItemHover', hoverColor);
        document.documentElement.style.setProperty('--megaMenuLinkBackground', backgroundHoverColor);
    }

    const onOverLayMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu(false)
        setMegaMenuFeaturedProducts([])
    };

    return (
      <>
        <div className={`main-nav__mega-menu mega-menu ${megaMenuIsOpen ? 'show' : ''}`} style={{ backgroundColor: backgroundColor }}>
            {menu.fields.primaryNavLinks ? 
                <div className="mega-menu__primary-nav">
                    {menu.fields.primaryNavLinks.map((link, index) => (
                        <div className="mega-menu__link" key={index} onMouseEnter={() => onLinkMouseEnter(menu.fields.hoverColor, menu.fields.backgroundHoverColor)}>
                            <div className="mega-menu__title">{link.fields.title}</div>
                            <div className="mega-menu__subtitle">{link.fields.subtitle}</div>
                        </div>
                    ))}
                </div>
            : ""}
            {menu.fields.secondaryNavLinks ?
                <div className="mega-menu__secondary-nav">
                    {menu.fields.secondaryNavLinks.map((link, index) => (
                        <div className="mega-menu__sub-link" key={index}>
                            <div className="mega-menu__title">{link.fields.title}</div>
                        </div>
                    ))}
                </div>
            : ""}
            {menu.fields.featuredArticles ? 
                <div className="mega-menu__featured-articles">
                    <div className="mega-menu__sub-header">Featrued Articles</div>
                    {menu.fields.featuredArticles.map((article, index) => (
                        <div className="mega-menu__featured-article" key={index}>
                            <span>{article.fields.title}</span><span><LongArrowRight /></span>
                        </div>
                    ))}
                </div>
            : ""}
            {megaMenuFeaturedProducts.length > 0 && menu.fields.featuredProductsList ? 
                <div className="mega-menu__featured-products">
                    <div className="mega-menu__sub-header">Featrued Products</div>
                    { megaMenuFeaturedProducts.map((product, index) => (
                        <div key={index} className="mega-menu__featured-product">
                            <div className="mega-menu__image">
                                {product.content.featuredMedia ? 
                                    <img src={product.content.featuredMedia.src}/>
                                : 
                                    <img src="http://placeimg.com/150/120/people"/>
                                }
                            </div>
                            <div className="mega-menu__content">
                                <div className="mega-menu__eyebrow">{product.content.title}</div>
                                <div className="mega-menu__subtitle"></div>
                                <div className="mega-menu__price">${product.variants[0].price}.00</div>
                            </div>
                        </div> 
                    ))}
                </div>
            : ""}
        </div>
        <div className={`mega-menu__overlay ${megaMenuIsOpen ? 'show' : ''}`} onMouseEnter={onOverLayMouseEnter}></div>
      </>
    );
  };
  
  export default MegaMenu;