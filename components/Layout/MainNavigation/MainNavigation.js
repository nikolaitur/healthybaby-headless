// import classes from './MainNavigation.scss'

import DropDownMenuItem from './DropdownMenuItem'
import Dropdown from './Dropdown'

const classes = {
    mainNav: 'main-nav',
    mainNavLogo: 'main-nav__logo',
    mainNavLeft: 'main-nav__left',
    mainNavRight: 'main-nav__right',
    mainNavItem: 'main-nav__item',
    mainNavDropdown: 'main-nav__dropdown',
}

const MainNavigation = ({props}) => {
    const logo = props.logo.fields.file.url
    const secondaryNavigation = props.secondaryNavigation
    const searchIcon = props.searchIcon.fields.file.url
    const accountIcon = props.babyIcon.fields.file.url
    const cartIcon = props.cartIcon.fields.file.url
   
    return (
      <nav className={classes.mainNav} id="SiteNav">
            <div className={classes.mainNavLeft}>
                <div className={classes.mainNavItem}>Build a Box</div>
                <div className={classes.mainNavItem}>Shop</div>
                <div className={classes.mainNavItem}>Guides</div>
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
      </nav>
    )
  }
  
  export default MainNavigation