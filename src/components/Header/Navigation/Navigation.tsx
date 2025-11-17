import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import MyNavButton from "./MyNavButton";

function Navigation() {
  const userToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const isUserAdmin = useAppSelector(
    (state: RootState) => state.auth.isUserAdmin
  );

  return (
    <>
      <div className="navigation container-fluid gap-2 m-1 m-lg-2 m-xxl-3 p-2 pt-3 d-flex flex-column align-items-center">
        <div className="row container-fluid justify-content-end">
          <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
            <MyNavButton url="/" navTitle="Homepage" />
            {userToken !== null && isUserAdmin === true && (
              <MyNavButton url="admin/shop" navTitle="*Shop*" />
            )}
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
            <MyNavButton url="catalog" navTitle="Catalog" />
            {userToken !== null && isUserAdmin === true && (
              <MyNavButton url="admin/stock" navTitle="*Stock*" />
            )}
          </div>
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="cart" navTitle="Cart" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/users" navTitle="*Users*" />
              )}
            </div>
          )}
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="orders" navTitle="Orders" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/orders" navTitle="*Orders*" />
              )}
            </div>
          )}
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="wishlist" navTitle="WishList" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/products" navTitle="*Products*" />
              )}
            </div>
          )}
          <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
            {userToken === null && (
              <>
                <MyNavButton url="register" navTitle="Register" />
                <MyNavButton url="login" navTitle="Login" />
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
      </div>
    </>
  );
}

export default Navigation;
