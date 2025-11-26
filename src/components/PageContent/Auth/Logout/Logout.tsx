import { useAppDispatch } from "../../../../app/hooks";
import { logoutUser } from "../../../../app/slices/authSlice";
import { Navigate } from "react-router-dom";


function Logout() {
  useAppDispatch()(logoutUser({}));
  
  return (
    <Navigate to="/login" />
  );
}

export default Logout;
