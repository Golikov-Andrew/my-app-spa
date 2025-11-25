import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import ProductList from "../../ProductList/ProductList";
import Title from "../Title/Title";
import { getWishListProducts } from "../../../app/wishlistThunks";

function WishList() {
  const products = useAppSelector(
    (state: RootState) => state.wishlist.products
  );
const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getWishListProducts({ token: token }));
    }
  },[] );
  

  return (
    <>
      <Title text="Избранное" />
      <div className="catalog container-fluid">
        <div className="row">
          <div className="col-9 m-auto">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
