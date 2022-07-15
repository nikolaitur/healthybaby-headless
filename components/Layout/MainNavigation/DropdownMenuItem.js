import { useState, useEffect, useRef } from "react";

import Dropdown from "./Dropdown";

const DropDownMenuItem = ({ item, classes }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  return (
    <div
      className="main-nav__item"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        <span>{item.fields.title}</span>
        <Dropdown links={item.fields.navLinks} dropdown={dropdown} classes={classes}/>
    </div>
  );
};

export default DropDownMenuItem;