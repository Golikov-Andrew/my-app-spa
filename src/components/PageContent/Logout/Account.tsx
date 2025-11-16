import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import Title from "../Title/Title";


function Account() {

  const username = useAppSelector((state: RootState) => state.auth.username)
  
  return (
    <>
      <Title text="Аккаунт"/>
      <div className="account">
        Здравствуйте, {username}!
      </div>
    </>
  );
}

export default Account;
