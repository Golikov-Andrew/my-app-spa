import type { CartItem } from "../../types/Product";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import CartListItem from "../ProductCard/CartListItem";

type CartListProps = {
  products: CartItem[];
};

function CartList({ products }: CartListProps) {
  
  const isUserAuthenticated =
    useAppSelector((state: RootState) => state.auth.accessToken) !== null;
  return (
    <div className="cart-list d-flex flex-wrap flex-column justify-content-center row-gap-3 row-gap-xl-4 col-xl-11 m-auto">
      {products.map((product) => (
        <CartListItem
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default CartList;
