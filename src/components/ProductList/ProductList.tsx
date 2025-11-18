import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/Product";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  // const productsTempArray = [];
  // for (let i = 0; i < products.length; i++) {
  //   if(products[i].hasOwnProperty('product')){

  //   }
  // }

  const isUserAuthenticated =
    useAppSelector((state: RootState) => state.auth.accessToken) !== null;
  return (
    <div className="product-list d-flex flex-wrap justify-content-center gap-4 row-gap-5 col-xxl-9 m-auto">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isUserAuthenticated={isUserAuthenticated}
        />
      ))}
    </div>
  );
}

export default ProductList;
