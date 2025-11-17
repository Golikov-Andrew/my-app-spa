import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/Product";

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-list d-flex flex-wrap justify-content-center gap-4 row-gap-5 col-xxl-9 m-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
