import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  const navbaritemlink = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "About",
      to: "/about",
    },
    {
      label: "Product",
      to: "/product",
    },
    {
      label: "Contact",
      to: "/contact",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <Link className="navbar__container__logo">ecom</Link>
        </div>
        <ul className="navbar__container__menu">
          {navbaritemlink.map((menuItem, key) => (
            <li className="navbar__container__menu__item">
              <Link
                className="navbar__container__menu__item__link"
                key={key}
                to={menuItem.to}
              >
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
