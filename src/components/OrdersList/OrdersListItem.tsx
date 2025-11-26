import { Link } from "react-router-dom";
import type { Order } from "../../types/Order";
import "./OrdersListItem.css";
import { DeliveryStatuses, OrderStatuses } from "../../types/Statuses";
import { useAppDispatch } from "../../app/hooks";
import { changeOrderThunk } from "../../app/ordersThunks";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { getShopDetails } from "../../app/shopThunks";

type Props = {
  order: Order;
  isUserAdmin: boolean;
};

function OrdersListListItem({ order, isUserAdmin }: Props) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  function onChangeOrderStatus(
    attributeName: string,
    attributeValue: string | boolean
  ) {
    if (token) {
      dispatch(
        changeOrderThunk({
          token: token,
          orderId: order.id,
          attributeName,
          attributeValue,
        })
      ).then(()=>{ 
        dispatch(getShopDetails({shopId: 1}))
      });
    }
  }

  return (
    <div className="orders-list-item d-flex gap-4 p-4 pb-0">
      <div className="d-flex col-6 flex-column gap-1">
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
          <div className="col-6">
            {isUserAdmin && (
              <select
                className="form-control dropdown-menu-right"
                value={order.orderStatus}
                id={"select_order_status_" + order.id}
                onChange={(e) => {
                  onChangeOrderStatus("order_status", e.currentTarget.value);
                }}
              >
                {Object.entries(OrderStatuses).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            )}
            {!isUserAdmin && order.orderStatus}
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="col-6">Статус Доставки:</div>
          <div className="col-6">
            {isUserAdmin && (
              <select
                className="form-control dropdown-menu-right"
                value={order.deliveryStatus}
                id={"select_delivery_status_" + order.id}
                onChange={(e) => {
                  onChangeOrderStatus("delivery_status", e.currentTarget.value);
                }}
              >
                {Object.entries(DeliveryStatuses).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            )}
            {!isUserAdmin && order.deliveryStatus}
          </div>
        </div>
      </div>
      <div className="d-flex col-6 flex-column gap-1">
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
          <div className="col-6">
            {isUserAdmin && (
              <input
                className="form-check-input danger"
                type="checkbox"
                checked={order.isOrderPaid}
                value=""
                id="is_paid_checkbox"
                onChange={(e) => {
                  onChangeOrderStatus("is_paid", e.currentTarget.checked);
                }}
              />
            )}

            {!isUserAdmin && (order.isOrderPaid ? "Да" : "Нет")}
          </div>
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
