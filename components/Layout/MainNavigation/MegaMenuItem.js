import { useRef } from "react";

import { useHeaderContext } from '../../../context/HeaderContext'

const MegaMenuItem = ({ menu, classes }) => {
  const { setmegaMenuIsOpen, setMegaMenu } = useHeaderContext()

  let ref = useRef();

  const onMouseEnter = () => {
    setmegaMenuIsOpen(true);
    setMegaMenu(menu)
  };

  return (
    <div
      className={classes.mainNavItem}
      ref={ref}
      onMouseEnter={onMouseEnter}
    >
        <span>{menu.fields.title}</span>
    </div>
  );
};

export default MegaMenuItem;