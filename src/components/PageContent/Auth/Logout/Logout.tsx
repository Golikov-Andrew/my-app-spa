import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { logoutUser } from "../../../../app/slices/authSlice";
import { Navigate } from "react-router-dom";


function Logout() {
  const dispatch = useAppDispatch()
  dispatch(logoutUser({}))
  
  return (
    <Navigate to="/login" />
  );
}

export default Logout;
