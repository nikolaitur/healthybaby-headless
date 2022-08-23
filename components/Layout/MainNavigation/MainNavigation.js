// import classes from './MainNavigation.scss'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SearchMenu from './SearchMenu';
import MegaMenu from './MegaMenu'
import MegaMenuItem from './MegaMenuItem'
import DropDownMenuItem from './DropdownMenuItem'

import { useHeaderContext } from '../../../context/HeaderContext'

import Logo from '../../../svgs/healthybaby-logo.svg'
import LogoMobile from '../../../svgs/healthybaby-logo-mobile.svg'
import HamburgerMenu from '../../../svgs/hamburger-menu.svg'
import Search from '../../../svgs/search.svg'
import Baby from '../../../svgs/baby.svg'
import Cart from '../../../svgs/cart.svg'
import CloseIcon from '../../../svgs/close-icon.svg'
import CaretRight from '../../../svgs/caret-right.svg'

const MainNavigation = ({props}) => {
    const primaryNavigation = props.mainNavigation
    const secondaryNavigation = props.secondaryNavigation
    // const searchIcon = props.searchIcon.fields.file.url
    // const accountIcon = props.babyIcon.fields.file.url
    // const cartIcon = props.cartIcon.fields.file.url

    const { megaMenuIsOpen, setmegaMenuIsOpen, megaMenu, setMegaMenu } = useHeaderContext()

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobileMenuSlideOpen, setMobileMenuSlideOpen] = useState(false);
    const [isSecondarySlideOpen, setSecondarySlideOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('');

    useEffect(() => {}, [isSearchOpen])

    const onMenuMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu(false)
    };

    const openMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
        setmegaMenuIsOpen(false);
        setMegaMenu(false)
    }

    const openMobileMegaMenuSlide = (menu, secondarySlide = false) => {
        if (menu) {
            if(secondarySlide) {
                setTimeout(() => {
                    document.documentElement.style.setProperty("--menuBackground",  "#ffffff");
                    document.documentElement.style.setProperty("--menuItemHover",  "#D0D8E9");
                    document.documentElement.style.setProperty("--megaMenuLinkBackground",  "#D0D8E9");
                }, 100);
            } else {
                document.documentElement.style.setProperty('--menuBackground',  menu.fields.backgroundColor);
                document.documentElement.style.setProperty('--menuItemHover',  menu.fields.hoverColor);
                document.documentElement.style.setProperty('--megaMenuLinkBackground',  menu.fields.backgroundHoverColor);
            }     
        }

        setMobileMenuSlideOpen(!isMobileMenuSlideOpen)
        setmegaMenuIsOpen(true);
        setMegaMenu(menu)
        setSecondarySlideOpen(secondarySlide)
    }

    const closeMobileMegaMenuSlide = () => {
        setMobileMenuSlideOpen(!isMobileMenuSlideOpen)
        setmegaMenuIsOpen(false);
        setMegaMenu(false)

        document.documentElement.style.setProperty("--menuBackground",  "#D0D8E9");
        document.documentElement.style.setProperty("--menuItemHover",  "#D0D8E9");
        document.documentElement.style.setProperty("--megaMenuLinkBackground",  "#D0D8E9");
    }

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
        setQuery('')
    }



    const handleSearchChange = event => {
      setQuery(event.target.value);
      // console.log('value is:', event.target.value);
    };
    
    return (
    <>
        <div className="main-nav">
            <div className="main-nav__left">
                <div className="main-nav__item" onMouseEnter={onMenuMouseEnter}>
                    <Link href="/">
                        Build a Box
                    </Link>
                </div>
                {primaryNavigation.map((item, index) => (
                    <MegaMenuItem key={index} menu={item}/>
                ))}
            </div>
            <div className="main-nav__logo">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="main-nav__right">
                {secondaryNavigation.map((item, index) => (
                    <DropDownMenuItem key={index} item={item} />
                ))}
                <div className={`main-nav__item ${isSearchOpen ? "active" : ""}`} onClick={() => toggleSearch()}>
                    <Search/>
                </div>
                <div className="main-nav__item">
                    <Baby/>
                </div>
                <div className="main-nav__item">
                    <Cart />
                </div>
                <div className={`main-nav__search ${isSearchOpen ? "active" : ""}`}>
                    <input type="text" className="input" placeholder="search products, articles, events, etc..." onChange={handleSearchChange} />
                </div>
            </div> 
            <MegaMenu menu={megaMenu} />
            <SearchMenu query={query} toggleSearch={toggleSearch} />
        </div>
        <div className="mobile-nav">
            <div className="mobile-nav__left">
                <div className="main-nav__item" onClick={() => openMobileMenu()}>
                    <HamburgerMenu />
                </div>
                <div className="main-nav__item" onClick={() => toggleSearch()}>
                    <Search />
                </div>
            </div>
            <div className="mobile-nav__logo">
                <LogoMobile />
            </div>
            <div className="mobile-nav__right">
                <div className="main-nav__item">
                    <Baby />
                </div>
                <div className="main-nav__item">
                    <Cart />
                </div>
            </div>
        </div>
        <div className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
            <div className="mobile-menu__close" onClick={() => closeMobileMenu()}>
                <CloseIcon />
            </div>
            <div className="mobile-menu__primary">
                <div className="mobile-menu__item">Build a Box</div>
                {primaryNavigation.map((item, index) => (
                    <div className="mobile-menu__item" key={index} onClick={() => openMobileMegaMenuSlide(item)}>
                        <span>{item.fields.title}</span>
                        <span><CaretRight /></span>
                    </div>
                ))}
            </div>
            <div className="mobile-menu__secondary">
                {secondaryNavigation.map((item, index) => (
                    <div className="mobile-menu__item" key={index} onClick={() => openMobileMegaMenuSlide(item, true)}>
                        <span>{item.fields.title}</span>
                        <span><CaretRight /></span>
                    </div>
                ))}
            </div>
            <div className="mobile-menu__sign-in">
                <Link href="/sign-in">
                    Sign In
                </Link>
            </div>
            <div className={`mobile-menu__slide ${isMobileMenuSlideOpen ? "is-open" : ""} ${isSecondarySlideOpen ? "secondary" : ""}`}>
                <div className="mobile-menu__back" onClick={() => closeMobileMegaMenuSlide()}>
                    <span><CaretRight /></span>
                    <span>Back</span>
                </div>
                <MegaMenu menu={megaMenu}/>
            </div>
        </div>

        <div className={`mobile-menu mobile-menu--serach ${isSearchOpen ? "is-open" : ""}`}>
            <div className="mobile-menu__close" onClick={() => toggleSearch()}>
                <CloseIcon />
            </div>
            <div className={`mobile-menu__search`}>
                <input type="text" className="input" placeholder="search products, articles, events, etc..." onChange={handleSearchChange} />
                <span><Search/></span>
            </div>
            <SearchMenu query={query} toggleSearch={toggleSearch} />
        </div>
      </>
    )
  }
  
  export default MainNavigation