import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Title from "../Title/Title";
import { setRedirectToAccount } from "../../../app/slices/authSlice";

function Account() {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state: RootState) => state.auth.username);
  const isUserAdmin = useAppSelector(
    (state: RootState) => state.auth.isUserAdmin
  );
  dispatch(setRedirectToAccount(false));

  return (
    <>
      <Title text="Аккаунт" />
      <div className="account d-flex justify-content-center m-4">
        Здравствуйте, {username}!
      </div>
      {isUserAdmin && (
        <div className="account d-flex justify-content-center m-4 col-6 text-center mx-auto">
          Вы имеете права администратора! Помимо прочих функций вы можете
          просматривать все заказы, редактировать их статусы, менять кол-во
          товаров на складе, а также видеть баланс магазина.
        </div>
      )}
      {!isUserAdmin && (
        <div className="account d-flex justify-content-center m-4 col-6 text-center mx-auto">
          Вы - наш дорогой покупатель! Вы имеете право выбрать любой товар,
          который вам понравится. Также есть возможность добавлять товар в
          список избранного. После процедуры оформления заказа с вами свяжется
          наш менеджер по контактам, которые вы укажете в форме к заказу.
        </div>
      )}
    </>
  );
}

export default Account;
