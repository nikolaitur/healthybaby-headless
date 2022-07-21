import { useRef, useEffect } from "react";

import { useHeaderContext } from '../../../context/HeaderContext'

const MegaMenuItem = ({ menu, classes }) => {
  const { setmegaMenuIsOpen, setMegaMenu, megaMenuFeaturedProducts, setMegaMenuFeaturedProducts } = useHeaderContext()

  let ref = useRef();

  const onMouseEnter = () => {
    setMegaMenuFeaturedProducts([])
    setmegaMenuIsOpen(true);
    setMegaMenu(menu)
  };

  const onMouseLeave = () => {
    setMegaMenuFeaturedProducts([])
  }

  const onMouseOver = () => {
    setMegaMenuFeaturedProducts([])
  }

  return (
    <div
      className="main-nav__item"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        <span>{menu.fields.title}</span>
    </div>
  );
};

export default MegaMenuItem;