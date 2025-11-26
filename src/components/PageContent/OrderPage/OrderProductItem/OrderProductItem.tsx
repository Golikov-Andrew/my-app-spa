import { Link } from "react-router-dom";
import type { OrderItem } from "../../../../types/Product";



type Props = {
  orderItem: OrderItem;
};

function OrderProductItem({ orderItem }: Props) {
  
  return (
      <div className="order-product-item d-flex gap-4 p-4 mx-auto">
        <div className="product-card">
      <div className="product-card-image">
        <img src={orderItem.product.image_url} alt={orderItem.product.title} />
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="product-card-price fs-4 text-danger">
          {orderItem.finalPrice} &#8381;
        </div>
        <div className="product-card-price fs-6 text-black">
          <s>{orderItem.blackPrice} &#8381;</s>
        </div>
      </div>
      <Link to={`/product/${orderItem.product.id}`} className="link-danger link-underline-opacity-25 link-underline-opacity-100-hover">
        <div className="product-card-title fs-14 fw-semibold">
          {orderItem.product.title}
        </div>
      </Link>

      <div className="product-card-description fs-6">
        x {orderItem.qty} = {orderItem.totalCost} &#8381;
      </div>
    </div>
      </div>
  );
}

export default OrderProductItem;
