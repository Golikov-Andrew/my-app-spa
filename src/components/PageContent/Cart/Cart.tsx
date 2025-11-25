import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import CartList from "../../ProductList/CartList";
import RightSideBar from "../../RightSideBar/RightSideBar";
import Title from "../Title/Title";
import { getCartListProducts } from "../../../app/cartlistThunks";
import Preloader from "../../Preloader/Preloader";

function Cart() {
  const products = useAppSelector(
    (state: RootState) => state.cartlist.products
  );

  const loading = useAppSelector(
    (state: RootState) => state.preloader.loading
  );
  const preloaderMessage = useAppSelector(
    (state: RootState) => state.preloader.preloaderMessage
  );
  const postloaderMessage = useAppSelector(
    (state: RootState) => state.preloader.postloaderMessage
  );

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getCartListProducts({ token: token }));
    }
  },[] );

  return (
    <>
      <Title text="Корзина" />
      <div className="catalog container-fluid">
        <div className="row">
          <div className="col-9">
            {loading && preloaderMessage && <Preloader preloaderMessage={preloaderMessage}></Preloader>}
            {!loading && postloaderMessage && <Preloader postloaderMessage={postloaderMessage}></Preloader>}
            {!loading && !postloaderMessage && <CartList products={products} />}
          </div>
          <RightSideBar></RightSideBar>
        </div>
      </div>
    </>
  );
}

export default Cart;
