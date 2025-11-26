import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { addProductToCartListThunk, removeProductFromCartListThunk } from "../../../app/cartlistThunks";
import "./AddToCartButton.css";
import { Button } from "react-bootstrap";

type AddToCartButtonProps = {
  productId: number;
};

function AddToCartButton({ productId }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const cartlistProducts = useAppSelector(
    (state: RootState) => state.cartlist.products
  );
  const token = useAppSelector((state: RootState) => state.auth.accessToken);

  let isProductExistsInCartList = false;
  cartlistProducts.forEach((product) => {
    if (product.id === productId) {
      isProductExistsInCartList = true;
      return;
    }
  });

  const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (evt.currentTarget.classList.contains("cartlist-btn-active")) {
      dispatch(
        removeProductFromCartListThunk({
          token: token,
          productId: productId, 
        })
      );
      
      evt.currentTarget.classList.remove("cartlist-btn-active");
    } else {
      evt.currentTarget.classList.add("cartlist-btn-active");
      dispatch(
        addProductToCartListThunk({
          token: token,
          productId: productId,
        })
      );

    }
  };

  return (
    <Button variant={isProductExistsInCartList
          ? "outline-danger"
          : "danger"}
      className={
        isProductExistsInCartList
          ? "cartlist-btn cartlist-btn-active"
          : "cartlist-btn"
      }
      onClick={onClick}
    >{isProductExistsInCartList
          ? "Убрать из корзины"
          : "Положить в корзину"}</Button>
  );
}

export default AddToCartButton;
