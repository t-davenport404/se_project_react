import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__user-name">Terrence Tegnegne</p>
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
