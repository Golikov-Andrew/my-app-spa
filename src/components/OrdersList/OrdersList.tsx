import ProductCard from "../ProductCard/ProductCard";
import type { Order, Product } from "../../types/Product";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import OrdersListListItem from "./OrdersListItem";

type OrdersListProps = {
  orders: Order[];
};

function OrdersList({ orders }: OrdersListProps) {

  const isUserAdmin = useAppSelector((state: RootState) => state.auth.isUserAdmin);

  return (
    <div className="orders-list d-flex flex-wrap flex-column justify-content-center gap-4 row-gap-3 col-xxl-9 m-auto">
      {orders.map((order) => (
        <OrdersListListItem
          key={order.id}
          order={order}
          isUserAdmin={isUserAdmin}
        />
      ))}
    </div>
  );
}

export default OrdersList;
