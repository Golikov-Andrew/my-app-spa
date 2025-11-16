import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import MyNavButton from "./MyNavButton";

function Navigation() {
  const userToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  return (
    <div className="navigation container-fluid m-2 p-2 pt-3 d-flex align-items-center">
      <div className="row container-fluid">
        <MyNavButton url="/" navTitle="Homepage" />
        <MyNavButton url="catalog" navTitle="Catalog" />
        {userToken === null && (
          <>
            <MyNavButton url="login" navTitle="Login" />
            <MyNavButton url="register" navTitle="Register" />
          </>
        )}
        {userToken !== null && (
          <>
            <MyNavButton url="logout" navTitle="Logout" />
            <MyNavButton url="account" navTitle="Account" />
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
