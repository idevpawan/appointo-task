import { useState } from "react";
import { getImage } from "../../utils";
import "./Header.css";

function Header() {
  const [showMenuDown, setShowMenuDown] = useState(false);
  return (
    <div className="header-container">
      <img className="header-image" src={getImage("logo.png")} alt="logo" />
      <ul className="header-links-container">
        <li
          onClick={() => setShowMenuDown(!showMenuDown)}
          className="header-link"
        >
          Menu{" "}
          <img
            className={`${showMenuDown && "rotate"}`}
            src={getImage("chevron-down.svg")}
            alt=""
          />
          {showMenuDown && <MenuDropdown />}
        </li>
        <li className="header-link">Contact us</li>
        <li className="header-btn">
          <img src={getImage("external-link.svg")} alt="" />
          Share link
        </li>
      </ul>
    </div>
  );
}

export default Header;

const MenuDropdown = () => {
  return (
    <ul className="menu-dropdown">
      <li>Home</li>
      <li>About</li>
      <li>Pricing</li>
      <div className="divider" />
      <li>Help center</li>
    </ul>
  );
};
