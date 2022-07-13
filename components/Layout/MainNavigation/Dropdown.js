const Dropdown = ({ links, dropdown, classes }) => {
    return (
      <ul className={`${classes.mainNavDropdown} ${dropdown ? "show" : ""}`}>
        {links.map((link, index) => (
            <li key={index}>{link.fields.title}</li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;