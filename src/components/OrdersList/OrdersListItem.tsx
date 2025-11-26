import { Link } from "react-router-dom";
import type { Order } from "../../types/Order";
import "./OrdersListItem.css";

type Props = {
  order: Order;
  isUserAdmin: boolean;
};

function OrdersListListItem({ order, isUserAdmin }: Props) {
  return (
    <div className="orders-list-item d-flex gap-4 p-4 pb-0">
      <div className="d-flex col-6 flex-column">
        <div className="d-flex gap-2">
          <div className="col-6">Создан:</div>
          <div className="col-6">{order.createdAt}</div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Изменён:</div>
          <div className="col-6">{order.updatedAt}</div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Статус Заказа:</div>
          <div className="col-6">{order.orderStatus}</div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Статус Доставки:</div>
          <div className="col-6">{order.deliveryStatus}</div>
        </div>
      </div>
      <div className="d-flex col-6 flex-column">
        <div className="d-flex gap-2">
          <div className="col-6">ID Заказа:</div>
          <div className="col-6">{order.id}</div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Сумма Заказа:</div>
          <div className="col-6">{order.totalPrice} &#8381;</div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Оплачен?</div>
          <div className="col-6">{order.isOrderPaid ? "Да" : "Нет"}</div>
        </div>
        <div className="d-flex gap-2">
          <Link
            to={`/order/${order.id}`}
            className="link-danger link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Подробнее о заказе
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrdersListListItem;
