import { useHeaderContext } from '../../../context/HeaderContext'

const MegaMenu = ({ menu, dropdown }) => {
    let backgroundColor = '';

    if (menu) {
        backgroundColor = menu.fields.backgroundColor
    }

    const { megaMenuIsOpen, setmegaMenuIsOpen, setMegaMenu } = useHeaderContext()

    if (!menu) {
        return ''
    }

    const onOverLayMouseEnter = () => {
        setmegaMenuIsOpen(false);
        setMegaMenu()
    };

    return (
      <>
        <div className={`main-nav__mega-menu ${megaMenuIsOpen ? 'show' : ''}`} style={{ backgroundColor: backgroundColor }}>{menu.title}</div>
        <div className={`main-nav__mega-menu--overlay ${megaMenuIsOpen ? 'show' : ''}`} onMouseEnter={onOverLayMouseEnter}></div>
      </>
    );
  };
  
  export default MegaMenu;