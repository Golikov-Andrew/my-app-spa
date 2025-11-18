import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { addProductToWishListThunk, removeProductFromWishListThunk } from "../../../app/wishlistThunks";
import type { Product } from "../../../types/Product";
import "./WishlistButton.css";

type WishlistButtonProps = {
  productId: number;
};

function WishlistButton({ productId }: WishlistButtonProps) {
  const dispatch = useAppDispatch();

  const wishlistProducts = useAppSelector(
    (state: RootState) => state.wishlist.products
  );
  const token = useAppSelector((state: RootState) => state.auth.accessToken);

  let isProductExistsInWishList = false;
  wishlistProducts.forEach((product) => {
    if (product.id === productId) {
      isProductExistsInWishList = true;
      return;
    }
  });

  const onClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.currentTarget.classList.contains("wishlist-btn-active")) {
      dispatch(
        removeProductFromWishListThunk({
          token: token,
          productId: productId, 
        })
      );
      
      evt.currentTarget.classList.remove("wishlist-btn-active");
    } else {
      evt.currentTarget.classList.add("wishlist-btn-active");
      dispatch(
        addProductToWishListThunk({
          token: token,
          productId: productId,
        })
      );

    }
  };

  return (
    <div
      className={
        isProductExistsInWishList
          ? "wishlist-btn wishlist-btn-active"
          : "wishlist-btn"
      }
      onClick={onClick}
    ></div>
  );
}

export default WishlistButton;
