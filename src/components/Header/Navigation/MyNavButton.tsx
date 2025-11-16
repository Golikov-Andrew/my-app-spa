import { NavLink } from "react-router-dom";

type MyNavButtonProps = {
  url: string;
  navTitle: string;
};


function MyNavButton({url, navTitle}: MyNavButtonProps) {
  return (
    <div className="col-3 text-center">
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? "btn btn-danger" : "btn btn-outline-danger"
        }
      >
        {navTitle}
      </NavLink>
    </div>
  );
}

export default MyNavButton;
