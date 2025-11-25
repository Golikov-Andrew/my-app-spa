import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/Product";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

type ProductListProps = {
  products: Product[];
  isUserAdmin?: boolean;
  hideZeroProduct?: boolean;
};

function ProductList({
  products,
  isUserAdmin,
  hideZeroProduct,
}: ProductListProps) {
  const isUserAdmin2 = isUserAdmin ?? false;
  const hideZeroProduct2 = hideZeroProduct ?? false;
  console.log("hideZeroProduct2", hideZeroProduct2);
  console.log("isUserAdmin2", isUserAdmin2);

  const isUserAuthenticated =
    useAppSelector((state: RootState) => state.auth.accessToken) !== null;

  let isToHideZeroProduct = false;
  if (!isUserAdmin2 && hideZeroProduct2) {
    isToHideZeroProduct = true;
  }

  let resultProducts: Product[] = [];
  products.forEach((product) => {
    if (isToHideZeroProduct) {
      if (product.quantity > 0) {
        resultProducts.push(product);
      }
    } else {
      resultProducts.push(product);
    }
    // if (isToHideZeroProduct && product.quantity > 0) {
    //   if(product.id === 6){
    //     debugger;
    //   }
    //   resultProducts.push(product);
    // } else {
    //   resultProducts.push(product);
    // }
  });

  return (
    <div className="product-list d-flex flex-wrap justify-content-center gap-4 row-gap-5 col-xxl-9 m-auto">
      {resultProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isUserAuthenticated={isUserAuthenticated}
          isUserAdmin={isUserAdmin2}
        />
      ))}
    </div>
  );
}

export default ProductList;
