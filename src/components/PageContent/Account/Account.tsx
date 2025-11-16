import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Title from "../Title/Title";
import { setRedirectToAccount } from "../../../app/slices/authSlice";


function Account() {

  const dispatch = useAppDispatch();

  const username = useAppSelector((state: RootState) => state.auth.username)
  dispatch(setRedirectToAccount(false));
  
  return (
    <>
      <Title text="Аккаунт"/>
      <div className="account d-flex justify-content-center m-4">
        Здравствуйте, {username}!
      </div>
    </>
  );
}

export default Account;
