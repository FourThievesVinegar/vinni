import { Link } from "react-router-dom";
import logo from "../images/logo.png";

import "./Header.scss";

export const Header = () => {
  return (
    <header className="application-header">
      <div className="brand-container">
        <div className="logo-container">
          <img src={logo} alt="Vinni logo" />
        </div>
        <h1 className="title-font">
          <Link to="/">Ask Vinni</Link>
        </h1>
      </div>
    </header>
  );
};
