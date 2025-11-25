import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import {
  setNewOrderFormBooleanData,
  setNewOrderFormTextData,
  type OrderFormBooleanField,
  type OrderFormTextField,
} from "../../app/slices/cartlistSlice";
import type React from "react";
import { createNewOrderThunk } from "../../app/cartlistThunks";
import './RightSideBar.css';

function RightSideBar() {
  const dispatch = useAppDispatch();
  const cartForm = useAppSelector((state: RootState) => state.cartlist);
  // const priceFrom = useAppSelector(
  //   (state: RootState) => state.catalog.filtersForm.priceFrom
  // );
  // const priceTo = useAppSelector(
  //   (state: RootState) => state.catalog.filtersForm.priceTo
  // );
  // const page = useAppSelector(
  //   (state: RootState) => state.catalog.currentCatalogPage
  // );
  const token = localStorage.getItem("token");

  const onChangeFormTextFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(
      setNewOrderFormTextData({
        attrName: e.target.name as OrderFormTextField,
        value: e.target.value,
      })
    );
  };

  const onChangeFormBooleanFields = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      setNewOrderFormBooleanData({
        attrName: e.target.name as OrderFormBooleanField,
        value: e.target.checked,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      dispatch(
        createNewOrderThunk({
          token: token,
          newOrderData: cartForm,
        })
      );
    }
  };

  return (
    <div className="right-sidebar px-4 position-fixed end-0 col-3 d-flex flex-column text-nowrap">
      {/* <h4>Оформление заказа</h4> */}

      <Form onSubmit={handleSubmit} className="d-flex gap-2 flex-column">
        <Form.Label className="fs-3">
          Итого: {cartForm.totalPrice} &#8381;
        </Form.Label>
        <div>
          <Form.Label>Адрес доставки: </Form.Label>
          <Form.Control
            type="text"
            name="deliveryAddress"
            value={cartForm.deliveryAddress}
            onChange={onChangeFormTextFields}
            required
          />
        </div>

        <div>
          <Form.Label>Имя получателя: </Form.Label>
          <Form.Control
            type="text"
            name="deliveryName"
            value={cartForm.deliveryName}
            onChange={onChangeFormTextFields}
            required
          />
        </div>

        <div>
          <Form.Label>Контакт получателя: </Form.Label>
          <Form.Control
            type="text"
            name="deliveryContact"
            value={cartForm.deliveryContact}
            onChange={onChangeFormTextFields}
            required
          />
        </div>

        <div>
          <Form.Label>Комментарий: </Form.Label>
          <Form.Control
            type="text"
            name="deliveryComment"
            value={cartForm.deliveryComment}
            onChange={onChangeFormTextFields}
          />
        </div>
        <div>
          <Form.Check
            type="checkbox"
            name="isOrderPaid"
            checked={cartForm.isOrderPaid}
            onChange={onChangeFormBooleanFields}
            label="Предоплата?"
          />
        </div>

        <Button variant="danger" type="submit">
          Заказать
        </Button>
      </Form>
    </div>
  );
}

export default RightSideBar;
