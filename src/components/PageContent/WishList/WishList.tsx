import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import ProductList from "../../ProductList/ProductList";
import Title from "../Title/Title";

function WishList() {
  const products = useAppSelector(
    (state: RootState) => state.wishlist.products
  );

  return (
    <>
      <Title text="Избранное" />
      <div className="catalog container-fluid">
        <div className="row">
          <div className="col-9">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
