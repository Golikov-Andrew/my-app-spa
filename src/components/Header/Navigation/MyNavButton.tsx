import { NavLink } from "react-router-dom";
import "./MyNavButton.css";

type MyNavButtonProps = {
  url: string;
  navTitle: string;
};


function MyNavButton({url, navTitle}: MyNavButtonProps) {
  return (
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? "btn my-nav-btn px-0 btn-danger text-center" : "btn my-nav-btn px-0 btn-outline-danger text-center"
        }
      >
        {navTitle}
      </NavLink>
  );
}

export default MyNavButton;
