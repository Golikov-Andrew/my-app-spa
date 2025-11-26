import { useAppDispatch } from "../../../../app/hooks";
import { logoutUser } from "../../../../app/slices/authSlice";
import { Navigate } from "react-router-dom";
import { clearWishList } from "../../../../app/slices/wishlistSlice";
import { clearOrders } from "../../../../app/slices/ordersSlice";
import { clearCart } from "../../../../app/slices/cartlistSlice";


function Logout() {
  const dispatch = useAppDispatch();
  dispatch(clearWishList());
  dispatch(clearOrders());
  dispatch(clearCart());
  dispatch(logoutUser());
  
  return (
    <Navigate to="/login" />
  );
}

export default Logout;
