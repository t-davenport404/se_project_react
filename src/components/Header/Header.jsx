import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <span className="header__menu">
        <ToggleSwitch className="header__toggle-switch" />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          +Add Clothes
        </button>
        <NavLink to="./profile" className="header__nav-link">
          <div className="header__user-container">
            <p className="header__user-name">Terrence Tegnegne</p>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </div>
        </NavLink>
      </span>
    </header>
  );
}

export default Header;
