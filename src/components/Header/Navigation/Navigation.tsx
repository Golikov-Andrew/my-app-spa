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
            <MyNavButton url="/" navTitle="Главная" />
            {userToken !== null && isUserAdmin === true && (
              <MyNavButton url="admin/shop" navTitle="*Магаз*" />
            )}
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
            <MyNavButton url="catalog" navTitle="Каталог" />
            {userToken !== null && isUserAdmin === true && (
              <MyNavButton url="admin/stock" navTitle="*Склад*" />
            )}
          </div>
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="cart" navTitle="Корзина" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/users" navTitle="*Клиенты*" />
              )}
            </div>
          )}
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="orders" navTitle="Заказы" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/orders" navTitle="*Все Заказы*" />
              )}
            </div>
          )}
          {userToken !== null && (
            <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
              <MyNavButton url="wishlist" navTitle="ВишЛист" />
              {isUserAdmin === true && (
                <MyNavButton url="admin/products" navTitle="*Товары*" />
              )}
            </div>
          )}
          <div className="col-2 d-flex justify-content-center align-items-center gap-2 flex-column">
            {userToken === null && (
              <>
                <MyNavButton url="register" navTitle="Регистрация" />
                <MyNavButton url="login" navTitle="Вход" />
              </>
            )}
            {userToken !== null && (
              <>
                <MyNavButton url="logout" navTitle="Выйти" />
                <MyNavButton url="account" navTitle="Аккаунт" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
