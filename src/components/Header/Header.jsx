import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleSignUpClick,
  handleLoginClick,
  handleAddClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userFirstLetter = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

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
        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={handleAddClick}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.name}'s avatar`}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userFirstLetter}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-container">
            <button
              type="button"
              onClick={handleSignUpClick}
              className="header__sign-up-btn"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleLoginClick}
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </span>
    </header>
  );
}

export default Header;
