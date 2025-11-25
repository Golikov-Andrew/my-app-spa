import { Link, NavLink } from "react-router-dom";
import type { CartItem, Product } from "../../types/Product";
import "./CartListItem.css";
import QtyChangeWidget from "./QtyChangeWidget/QtyChangeWidget";

type ProductCardProps = {
  product: CartItem;
};

function CartListItem({ product }: ProductCardProps) {
  return (
    <div className="cart-list-item d-flex gap-4">
      <div className="cart-list-item-image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className="cart-list-item-attrs">
        <div className="d-flex align-items-center gap-4">
          <div className="cart-list-item-final-price text-danger">
            {product.final_price} &#8381;
          </div>
          <div className="cart-list-item-black-price text-black">
            <s>{product.black_price} &#8381;</s>
          </div>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="link-danger link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          <div className="cart-list-item-title fw-semibold">
            {product.title}
          </div>
        </Link>
        <div className="cart-list-item-description">{product.description}</div>
      </div>

      <div className="cart-list-item-qty d-flex align-items-center gap-2 fs-5">
        <QtyChangeWidget
          productId={product.id}
          qty={product.quantity}
          page="cart"
        ></QtyChangeWidget>
        
      </div>
    </div>
  );
}

export default CartListItem;
