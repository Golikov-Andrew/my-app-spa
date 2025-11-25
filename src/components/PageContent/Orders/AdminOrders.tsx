import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import OrdersList from "../../OrdersList/OrdersList";
import Title from "../Title/Title";
import { getAdminOrdersThunk } from "../../../app/ordersThunks";

function AdminOrders() {
  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getAdminOrdersThunk({ token: token }));
    }
  }, []);

  return (
    <>
      <Title text="Админка - Заказы" />
      <div className="orders container-fluid">
        <div className="row">
          <div className="col-9 m-auto">
            <OrdersList orders={orders} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
