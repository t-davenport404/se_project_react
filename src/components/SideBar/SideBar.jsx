import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleLogout, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
          className="sidebar__avatar"
        />
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>

      <div className="sidebar__navigation">
        <button
          type="button"
          onClick={handleEditProfileClick}
          className="sidebar__edit-btn"
        >
          Change profile data
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar__logout-btn"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
