import Link from 'next/link';

const Dropdown = ({ links, dropdown }) => {
    return (
      <ul className={`main-nav__dropdown ${dropdown ? "show" : ""}`}>
        {links.map((link, index) => (
            <li key={index}>
                <Link href={link.fields.url}>
                    {link.fields.title}
                </Link>
            </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;