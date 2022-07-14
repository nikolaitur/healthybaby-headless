// import classes from './MainNavigation.scss'

import MegaMenu from './MegaMenu'
import MegaMenuItem from './MegaMenuItem'
import DropDownMenuItem from './DropdownMenuItem'

import { useHeaderContext } from '../../../context/HeaderContext'

const classes = {
    mainNav: 'main-nav',
    mainNavLogo: 'main-nav__logo',
    mainNavLeft: 'main-nav__left',
    mainNavRight: 'main-nav__right',
    mainNavItem: 'main-nav__item',
    mainNavDropdown: 'main-nav__dropdown',
}

const MainNavigation = ({props}) => {
    console.log(useHeaderContext(), 'headercontext')
    const logo = props.logo.fields.file.url
    const primaryNavigation = props.mainNavigation
    const secondaryNavigation = props.secondaryNavigation
    const searchIcon = props.searchIcon.fields.file.url
    const accountIcon = props.babyIcon.fields.file.url
    const cartIcon = props.cartIcon.fields.file.url

    const { megaMenuIsOpen, setmegaMenuIsOpen, megaMenu, setMegaMenu } = useHeaderContext()

    let MegaMenuData = primaryNavigation[0].fields

    console.log(MegaMenuData, 'test data')

    const onMenuMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu()
    };
    
    return (
      <nav className={classes.mainNav} id="SiteNav">
            <div className={classes.mainNavLeft}>
                <div className={classes.mainNavItem} onMouseEnter={onMenuMouseEnter}>Build a Box</div>
                {primaryNavigation.map((item, index) => (
                    <MegaMenuItem key={index} menu={item} classes={classes} />
                    // <div onClick={() => setmegaMenuIsOpen("true")} className={classes.mainNavItem}>{item.fields.title}</div>
                ))}
            </div>
            <div className={classes.mainNavLogo}>
                <img src={logo}/>
            </div>
            <div className={classes.mainNavRight}>
                {secondaryNavigation.map((item, index) => (
                    <DropDownMenuItem key={index} item={item} classes={classes} />
                ))}
                <div className={classes.mainNavItem}><img src={searchIcon}/></div>
                <div className={classes.mainNavItem}><img src={accountIcon}/></div>
                <div className={classes.mainNavItem}><img src={cartIcon}/></div>
            </div>
            
            <MegaMenu menu={megaMenu} />
      </nav>
    )
  }
  
  export default MainNavigation