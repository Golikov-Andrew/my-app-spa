import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import OrdersList from "../../OrdersList/OrdersList";
import ProductList from "../../ProductList/ProductList";
import Title from "../Title/Title";
import { getOrdersThunk } from "../../../app/ordersThunks";

function Orders() {
  const orders = useAppSelector(
    (state: RootState) => state.orders.orders
  );
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
      if (token) {
        dispatch(getOrdersThunk({ token: token }));
      }
    },[] );
  

  return (
    <>
      <Title text="Заказы" />
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

export default Orders;
