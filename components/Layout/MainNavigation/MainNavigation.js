// import classes from './MainNavigation.scss'
import React, { useState, useEffect, forwardRef, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import SearchMenu from './SearchMenu'
import MegaMenu from './MegaMenu'
import MegaMenuItem from './MegaMenuItem'
import DropDownMenuItem from './DropdownMenuItem'

import { useCustomerContext } from '../../../context/CustomerContext'
import { useModalContext } from '../../../context/ModalContext'
import { useHeaderContext } from '../../../context/HeaderContext'
import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import Logo from '../../../svgs/healthybaby-logo.svg'
import LogoMobile from '../../../svgs/healthybaby-logo-mobile.svg'
import HamburgerMenu from '../../../svgs/hamburger-menu.svg'
import Search from '../../../svgs/search.svg'
import Baby from '../../../svgs/baby.svg'
import Cart from '../../../svgs/cart.svg'
import CloseIcon from '../../../svgs/close-icon.svg'
import CaretRight from '../../../svgs/caret-right.svg'

import { unlockScroll, lockScroll } from '@/utils/scroll'

const MainNavigation = forwardRef(({ props }, ref) => {
  const customerContext = useCustomerContext()
  const modalContext = useModalContext()
  const { megaMenuIsOpen, setmegaMenuIsOpen, megaMenu, setMegaMenu } = useHeaderContext()
  const cartDrawerContext = useCartDrawerContext()

  const router = useRouter()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileMenuSlideOpen, setMobileMenuSlideOpen] = useState(false)
  const [isSecondarySlideOpen, setSecondarySlideOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [announcementBarHeight, setAnnoucementBarHeight] = useState()

  const mobileMenuRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      setAnnoucementBarHeight(
        ref?.current.offsetHeight ? ref?.current.offsetHeight : 0
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const openAccountModal = () => {
    modalContext.setIsOpen(false)
    modalContext.setModalType('login')
    modalContext.setIsOpen(true)
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true)
    setmegaMenuIsOpen(true)
    lockScroll(0)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setmegaMenuIsOpen(false)
    setMegaMenu(false)
    closeMobileMegaMenuSlide()
    setSearchOpen()
    unlockScroll()
    document.body.classList.remove('searchmenu-is-active')
  }

  const openMobileMegaMenuSlide = (menu, secondarySlide = false) => {
    if (menu) {
      if (secondarySlide) {
        setTimeout(() => {
          document.documentElement.style.setProperty(
            '--menuBackground',
            '#ffffff'
          )
          document.documentElement.style.setProperty(
            '--menuItemHover',
            '#D0D8E9'
          )
          document.documentElement.style.setProperty(
            '--megaMenuLinkBackground',
            '#D0D8E9'
          )
        }, 100)
      } else {
        document.documentElement.style.setProperty(
          '--menuBackground',
          menu.fields.backgroundColor
        )
        document.documentElement.style.setProperty(
          '--menuItemHover',
          menu.fields.hoverColor
        )
        document.documentElement.style.setProperty(
          '--megaMenuLinkBackground',
          menu.fields.backgroundHoverColor
        )
      }
    }

    setMobileMenuSlideOpen(true)
    setmegaMenuIsOpen(true)
    setMegaMenu(menu)
    setSecondarySlideOpen(secondarySlide)
  }

  const closeMobileMegaMenuSlide = () => {
    setMobileMenuSlideOpen(false)
    document.documentElement.style.setProperty('--menuBackground', '#D0D8E9')
    document.documentElement.style.setProperty('--menuItemHover', '#D0D8E9')
    document.documentElement.style.setProperty(
      '--megaMenuLinkBackground',
      '#D0D8E9'
    )
  }

  const openCartDrawer = () => {
    cartDrawerContext.setIsOpen(true)
  }
  const toggleSearch = () => {
    if (router.pathname === '/search') {
      return false
    }
    if (isSearchOpen && window?.innerWidth < 1074) {
      document.body.classList.remove('searchmenu-is-active')
    } else if (!isSearchOpen && window?.innerWidth < 1074) {
      document.body.classList.add('searchmenu-is-active')
    }
    setSearchOpen(!isSearchOpen)
    setSearchQuery('')
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchOpen(false)
      router.push(`/search?query=${e.target.value}`)
    }
  }

  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      if (mobileMenuRef.current.classList.contains('is-open')) {
        closeMobileMenu()
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (megaMenuIsOpen) {
      setSearchOpen(false)
      setSearchQuery('')
    }
  }, [megaMenuIsOpen])

  useEffect(() => {
    const onRouteChangeComplete = () => {
      closeMobileMenu()
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete)
  }, [router.pathname])

  return (
    <>
      <div className="main-nav">
        <div className="main-nav__left">
          {/* <div className="main-nav__item" onMouseEnter={onMenuMouseEnter}>
                    <Link href="/">
                        <a>
                            Build a Box
                        </a>
                    </Link>
                </div> */}
          {props?.mainNavigation
            ? props.mainNavigation.map((item, index) => (
                <MegaMenuItem key={index} menu={item} />
              ))
            : ''}
        </div>
        <div className="main-nav__logo">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <div className="main-nav__right">
          {props?.secondaryNavigation
            ? props.secondaryNavigation.map((item, index) => (
                <DropDownMenuItem key={index} item={item} />
              ))
            : ''}
          <div
            className={`main-nav__item main-nav__item-search ${isSearchOpen ? 'active' : ''}`}
            onClick={() => toggleSearch()}
          >
            <Search />
          </div>
          {customerContext.customer ? (
            <div className="main-nav__item">
              <Link href="/account/my-info">
                <a>
                  <Baby />
                </a>
              </Link>
            </div>
          ) : (
            <div className="main-nav__item" onClick={() => openAccountModal()}>
              <Baby />
            </div>
          )}
          <div className="main-nav__item main-nav__item-cart" onClick={() => openCartDrawer()}>
            <Cart />
            {cartDrawerContext.cartCount > 0 ? (
              <span>{ cartDrawerContext.cartCount }</span>
            ) : ""}
          </div>
          <div className={`main-nav__search ${isSearchOpen ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="search products"
              onChange={handleSearchChange}
              value={searchQuery}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        </div>
        <MegaMenu menu={megaMenu} />
        <SearchMenu
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchOpen={setSearchOpen}
          isSearchOpen={isSearchOpen}
        />
      </div>
      <div className="mobile-nav">
        <div className="mobile-nav__left">
          <div className="main-nav__item" onClick={() => openMobileMenu()}>
            <HamburgerMenu />
          </div>
          <div className="main-nav__item main-nav__item-search" onClick={() => toggleSearch()}>
            <Search />
          </div>
        </div>
        <div className="mobile-nav__logo">
          <Link href="/">
            <a>
              <LogoMobile />
            </a>
          </Link>
        </div>
        <div className="mobile-nav__right">
          {customerContext.customer ? (
            <div className="main-nav__item">
              <Link href="/account/my-info">
                <a>
                  <Baby />
                </a>
              </Link>
            </div>
          ) : (
            <div className="main-nav__item" onClick={() => openAccountModal()}>
              <Baby />
            </div>
          )}
          <div className="main-nav__item main-nav__item-cart" onClick={() => openCartDrawer()}>
            <Cart />
            {cartDrawerContext.cartCount > 0 ? (
              <span>{ cartDrawerContext.cartCount }</span>
            ) : ""}
          </div>
        </div>
      </div>
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
        style={{ top: announcementBarHeight }}
        ref={mobileMenuRef}
      >
        <div className="mobile-menu__close" onClick={() => closeMobileMenu()}>
          <CloseIcon />
        </div>
        <div className="mobile-menu__primary">
          {/* <div className="mobile-menu__item">Build a Box</div> */}
          {props?.mainNavigation
            ? props.mainNavigation.map((item, index) => (
                <div
                  className="mobile-menu__item"
                  key={index}
                  onClick={() => openMobileMegaMenuSlide(item)}
                >
                  <span>{item.fields.title}</span>
                  <span>
                    <CaretRight />
                  </span>
                </div>
              ))
            : ''}
        </div>
        <div className="mobile-menu__secondary">
          {props?.secondaryNavigation
            ? props.secondaryNavigation.map((item, index) => (
                <div
                  className="mobile-menu__item"
                  key={index}
                  onClick={() => openMobileMegaMenuSlide(item, true)}
                >
                  <span>{item.fields.title}</span>
                  <span>
                    <CaretRight />
                  </span>
                </div>
              ))
            : ''}
        </div>
        <div className="mobile-menu__sign-in">
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </div>
        <div
          className={`mobile-menu__slide ${
            isMobileMenuSlideOpen ? 'is-open' : ''
          } ${isSecondarySlideOpen ? 'secondary' : ''}`}
        >
          <div
            className="mobile-menu__back"
            onClick={() => closeMobileMegaMenuSlide()}
          >
            <span>
              <CaretRight />
            </span>
            <span>Back</span>
          </div>
          <MegaMenu menu={megaMenu} />
        </div>
      </div>

      <div
        className={`mobile-menu mobile-menu--search ${
          isSearchOpen ? 'is-open' : ''
        }`}
        style={{ top: announcementBarHeight }}
      >
        <div className="mobile-menu__close" onClick={() => closeMobileMenu()}>
          <CloseIcon />
        </div>
        <div className={`mobile-menu__search`}>
          <div className="mobile-menu__search-input-wrapper">
            <input
              type="text"
              placeholder="search products"
              onChange={handleSearchChange}
              onKeyDown={(e) => handleKeyDown(e)}
              value={searchQuery}
            />
            <button className="mobile-menu__search-input-submit-btn" onClick={() => router.push(`/search?query=${searchQuery}`)}>
              <Search />
            </button>
          </div>
        </div>
        <SearchMenu
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchOpen={setSearchOpen}
          isSearchOpen={isSearchOpen}
        />
      </div>
    </>
  )
})

export default MainNavigation
