import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { useEffect } from "react";
import { getOrderDetailsThunk } from "../../../app/orderPageThunks";
import "./OrderPage.css";
import OrderProductItem from "./OrderProductItem/OrderProductItem";

function OrderPage() {
  const { id } = useParams();

  const order = useAppSelector((state: RootState) => state.order.order);
  const orderItems = order.orderItems;
  const isUserAuthenticated =
    useAppSelector((state: RootState) => state.auth.accessToken) !== null;

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id && token) {
      dispatch(getOrderDetailsThunk({ orderId: +id, token: token }));
    }
  }, [id]);

  return (
    <>
      <div className="order-page-content d-flex gap-4 p-4 col-xxl-9 mx-auto">
        <div className="d-flex col-6 flex-column">
          <div className="d-flex gap-2">
            <div className="col-6">ID Заказа:</div>
            <div className="col-6">{order.id}</div>
          </div>
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
          <div className="d-flex gap-2">
            <div className="col-6">Сумма Заказа:</div>
            <div className="col-6">{order.totalPrice} &#8381;</div>
          </div>
          <div className="d-flex gap-2">
            <div className="col-6">Оплачен?</div>
            <div className="col-6">{order.isOrderPaid ? "Да" : "Нет"}</div>
          </div>
        </div>
        <div className="d-flex col-6 flex-column">
          <div className="d-flex gap-2">
            <div className="col-6">Адрес доставки:</div>
            <div className="col-6">{order.deliveryAddress}</div>
          </div>
          <div className="d-flex gap-2">
            <div className="col-6">Имя получателя:</div>
            <div className="col-6">{order.deliveryName}</div>
          </div>
          <div className="d-flex gap-2">
            <div className="col-6">Контакт получателя:</div>
            <div className="col-6">{order.deliveryContact}</div>
          </div>
          <div className="d-flex gap-2">
            <div className="col-6">Комментарий:</div>
            <div className="col-6">{order.deliveryComment}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="product-list d-flex flex-wrap justify-content-center gap-4 row-gap-5 col-xxl-9 m-auto">
          {orderItems.map((item) => (
            <OrderProductItem
              key={item.product.id}
              orderItem={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderPage;
