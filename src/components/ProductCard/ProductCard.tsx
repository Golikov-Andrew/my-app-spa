import { Link, NavLink } from "react-router-dom";
import type { Product } from "../../types/Product";
import "./ProductCard.css";
import WishlistButton from "./WishlistButton/WishlistButton";

type ProductCardProps = {
  product: Product;
  isUserAuthenticated: boolean;
};

function ProductCard({ product, isUserAuthenticated }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image_url} alt={product.title} />
        {isUserAuthenticated && (
          <WishlistButton productId={product.id}></WishlistButton>
        )}
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="product-card-price fs-4 text-danger">
          {product.final_price} &#8381;
        </div>
        <div className="product-card-price fs-6 text-black">
          <s>{product.black_price} &#8381;</s>
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="link-danger link-underline-opacity-25 link-underline-opacity-100-hover">
        <div className="product-card-title fs-14 fw-semibold">
          {product.title}
        </div>
      </Link>

      <div className="product-card-description fs-12">
        {product.description}
      </div>
    </div>
  );
}

export default ProductCard;
