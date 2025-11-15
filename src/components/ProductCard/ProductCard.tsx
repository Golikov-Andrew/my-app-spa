import type { Product } from "../../types/Product";
import './ProductCard.css';

type ProductCardProps = {
  product: Product
}

function ProductCard({product}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className="product-card-price fs-4 text-danger">{product.final_price} &#8381;</div>
      <div className="product-card-title fs-5">{product.title}</div>
      <div className="product-card-description fs-6">{product.description}</div>
    </div>
  );
}

export default ProductCard;
