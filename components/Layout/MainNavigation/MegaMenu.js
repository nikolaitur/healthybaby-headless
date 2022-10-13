import { useEffect } from 'react'
import Link from 'next/link';

import { useHeaderContext } from '../../../context/HeaderContext'

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const MegaMenu = ({ menu, menuColors }) => {
    const { megaMenuIsOpen, setmegaMenuIsOpen, setMegaMenu } = useHeaderContext()

    useEffect(() => {
    }, []);

    if (!menu) {
        return ''
    }

    let backgroundColor = '';

    if (menu) {
        backgroundColor = menu.fields.backgroundColor
        document.documentElement.style.setProperty('--menuItemHover',  menu.fields.hoverColor);
        document.documentElement.style.setProperty('--megaMenuLinkBackground',  menu.fields.backgroundHoverColor);
    }

    const onLinkMouseEnter = (hoverColor, backgroundHoverColor) => {
        document.documentElement.style.setProperty('--menuItemHover', hoverColor);
        document.documentElement.style.setProperty('--megaMenuLinkBackground', backgroundHoverColor);
    }

    const onOverLayMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu(false)
    };

    return (
      <>
        <div className={`main-nav__mega-menu mega-menu ${megaMenuIsOpen ? 'show' : ''}`} style={{ backgroundColor: backgroundColor }}>
            <div className="mega-menu__scrollable">
                {menu.fields.primaryNavLinks ?
                    <div className="mega-menu__primary-nav">
                        {menu.fields.primaryNavLinks.map((link, index) => (
                            <Link href={link.fields.url} key={index}>
                                <div className="mega-menu__link" onMouseEnter={() => onLinkMouseEnter(menu.fields.hoverColor, menu.fields.backgroundHoverColor)}>
                                    <div className="mega-menu__title">{link.fields.title}</div>
                                    <div className="mega-menu__subtitle">{link.fields.subtitle}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                : ""}
                {menu.fields.secondaryNavLinks ?
                    <div className="mega-menu__secondary-nav">
                        {menu.fields.secondaryNavLinks.map((link, index) => (
                            <Link href={link.fields.url} key={index}>
                                <div className="mega-menu__sub-link" >
                                    <div className="mega-menu__title">{link.fields.title}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                : ""}
                {menu.fields.featuredArticles ?
                    <div className="mega-menu__featured-articles">
                        <div className="mega-menu__sub-header">Featured Articles</div>
                        {menu.fields.featuredArticles.map((article, index) => (
                            <Link href={article.fields.handle} key={index}>
                                <div className="mega-menu__featured-article" >
                                    <span>{article.fields.title}</span>
                                    <span><LongArrowRight /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                : ""}
                {/* client requested to remove this section */}
                {/* {menu.fields?.featuredProductsList?.length > 0 ?
                    <div className="mega-menu__featured-products">
                        <div className="mega-menu__sub-header">Featured Products</div>
                        {menu.fields.featuredProductsList.map((product, index) => {
                            const firstVariant = product.variants[0]
                            return (
                                <div key={index} className="mega-menu__featured-product">
                                    <div className="mega-menu__image">
                                        {product.content.featuredMedia ?
                                            <Image
                                                src={product.content.featuredMedia.src}
                                                alt={product.content.title}
                                                width={115}
                                                height={148}
                                            />
                                        :
                                            <Image
                                                src="https://placeimg.com/150/120/people"
                                                alt={product.content.title}
                                                layout="fill"
                                            />
                                        }
                                    </div>
                                    <div className="mega-menu__content">
                                        <div className="mega-menu__eyebrow">{product.content.title}</div>
                                        {firstVariant.content.title && firstVariant.content.title !== 'Default Title' && <div className="mega-menu__subtitle">{firstVariant.content.title}</div>}
                                        <div className="mega-menu__price">${product.variants[0].price}.00</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                : ""} */}
            </div>
        </div>
        <div className={`mega-menu__overlay ${megaMenuIsOpen ? 'show' : ''}`} onMouseEnter={onOverLayMouseEnter}></div>
      </>
    );
  };

  export default MegaMenu;