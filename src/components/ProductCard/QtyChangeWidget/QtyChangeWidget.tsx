import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import {
  addProductToCartListThunk,
  changeCartItemQtyThunk,
  removeProductFromCartListThunk,
} from "../../../app/cartlistThunks";
//import type { CartItem } from "../../../types/Product";
// import "./AddToCartButton.css";
import { Button } from "react-bootstrap";

type QtyChangeWidgetProps = {
  productId: number;
  qty: number;
};

function QtyChangeWidget({ productId, qty }: QtyChangeWidgetProps) {
  const dispatch = useAppDispatch();

  // const cartlistProducts = useAppSelector(
  //   (state: RootState) => state.cartlist.products
  // );
  const token = useAppSelector((state: RootState) => state.auth.accessToken);

  // let isProductExistsInCartList = false;
  // cartlistProducts.forEach((product) => {
  //   if (product.id === productId) {
  //     isProductExistsInCartList = true;
  //     return;
  //   }
  // });

  const onClick = (evt: React.MouseEvent<HTMLButtonElement>, isIncrement: boolean) => {
      dispatch(
        changeCartItemQtyThunk({
          token: token,
          productId: productId,
          isIncrement: isIncrement
        })
      );
  };

  return (
    <>
      <Button variant="danger" onClick={(evt)=>{onClick(evt, true)}}>
        &uarr;
      </Button>
      {qty}
      <Button variant="danger" onClick={(evt)=>{onClick(evt, false)}}>
        &darr;
      </Button>
    </>
  );
}

export default QtyChangeWidget;
