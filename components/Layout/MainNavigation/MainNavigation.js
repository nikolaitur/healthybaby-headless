// import classes from './MainNavigation.scss'

import MegaMenu from './MegaMenu'
import MegaMenuItem from './MegaMenuItem'
import DropDownMenuItem from './DropdownMenuItem'

import { useHeaderContext } from '../../../context/HeaderContext'

import HamburgerMenu from '../../../svgs/hamburger-menu.svg'

const MainNavigation = ({props}) => {
    const logo = props.logo.fields.file.url
    const primaryNavigation = props.mainNavigation
    const secondaryNavigation = props.secondaryNavigation
    const searchIcon = props.searchIcon.fields.file.url
    const accountIcon = props.babyIcon.fields.file.url
    const cartIcon = props.cartIcon.fields.file.url

    const { megaMenuIsOpen, setmegaMenuIsOpen, megaMenu, setMegaMenu } = useHeaderContext()

    const onMenuMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu()
    };

    const openMobileMenu = () => {

    }

    // const megaMenuTest = megaMenu[0]
    
    return (
    <>
        <div className="main-nav">
            <div className="main-nav__left">
                <div className="main-nav__item" onMouseEnter={onMenuMouseEnter}>Build a Box</div>
                {primaryNavigation.map((item, index) => (
                    <MegaMenuItem key={index} menu={item}/>
                ))}
            </div>
            <div className="main-nav__logo">
                <img src={logo}/>
            </div>
            <div className="main-nav__right">
                {secondaryNavigation.map((item, index) => (
                    <DropDownMenuItem key={index} item={item} />
                ))}
                <div className="main-nav__item"><img src={searchIcon}/></div>
                <div className="main-nav__item"><img src={accountIcon}/></div>
                <div className="main-nav__item"><img src={cartIcon}/></div>
            </div> 
            <MegaMenu menu={megaMenu} />
        </div>
        <div className="mobile-nav">
            <div className="mobile-nav__left">
                <div className="main-nav__item" onClick={openMobileMenu}><HamburgerMenu /></div>
                <div className="main-nav__item"><HamburgerMenu /></div>
            </div>
            <div className="mobile-nav__logo">
                <img src={logo}/>
            </div>
            <div className="mobile-nav__right">
                <div className="main-nav__item"><HamburgerMenu /></div>
                <div className="main-nav__item"><HamburgerMenu /></div>
            </div>
        </div>
        <div class="mobile-menu">
            <div className="mobile-menu__primary">
                <div className="main-nav__item">Build a Box</div>
                {primaryNavigation.map((item, index) => (
                    <div className="main-nav__item">{item.fields.title}</div>
                ))}
            </div>
            <div className="mobile-menu__secondary">

            </div>
        </div>
      </>
    )
  }
  
  export default MainNavigation