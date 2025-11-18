import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getProductDetails } from "../../../app/productPageThunks";
import type { RootState } from "../../../app/store";
import WishlistButton from "../../ProductCard/WishlistButton/WishlistButton";
import { useEffect } from "react";
import "./ProductPage.css";
import { Button } from "react-bootstrap";

function ProductPage() {
  const { id } = useParams();

  const product = useAppSelector(
    (state: RootState) => state.productPage.product
  );
  //   const product = useAppSelector((state: RootState) => state.productPage);
  const isUserAuthenticated =
    useAppSelector((state: RootState) => state.auth.accessToken) !== null;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails({ productId: +id }));
    }
  }, [id]);

  return (
    <>
      <div className="product-page container-fluid my-4">
        <div className="row justify-content-center">
          <div className="col-6 col-md-5 col-xxl-4 d-flex flex-column">
            <div className="product-card-image text-end">
              <img src={product.image_url} alt={product.title} />
              {isUserAuthenticated && (
                <WishlistButton productId={product.id}></WishlistButton>
              )}
            </div>
          </div>
          <div className="col-6 col-md-5 col-xxl-4 d-flex flex-column gap-4">
            <div>
              <div className="product-title fw-semibold">{product.title}</div>
              <div className="d-flex align-items-center gap-4">
                <div className="product-final-price fw-semibold text-danger">
                  {product.final_price} &#8381;
                </div>
                <div className="product-black-price text-black">
                  <s>{product.black_price} &#8381;</s>
                </div>
              </div>
              <div className="product-description">{product.description}</div>
            </div>
            <div>
              {isUserAuthenticated && (
                <Button variant="danger" type="submit">
                  Положить в корзину
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
