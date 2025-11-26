import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { changeCartItemQtyThunk } from "../../../app/cartlistThunks";
import { Button } from "react-bootstrap";
import { changeAdminProductQtyThunk } from "../../../app/catalogThunks";

type QtyChangeWidgetProps = {
  productId: number;
  qty: number;
  page: "cart" | "products";
};

function QtyChangeWidget({ productId, qty, page }: QtyChangeWidgetProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.accessToken);

  const onClick = (
    evt: React.MouseEvent<HTMLButtonElement>,
    isIncrement: boolean
  ) => {
    if (page === "cart") {
      dispatch(
        changeCartItemQtyThunk({
          token: token,
          productId: productId,
          isIncrement: isIncrement,
        })
      );
    } else if (page === "products") {
      dispatch(
        changeAdminProductQtyThunk({
          token: token,
          productId: productId,
          isIncrement: isIncrement,
        })
      );
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={(evt) => {
          onClick(evt, true);
        }}
      >
        &uarr;
      </Button>
      <span className="p-2">{qty}</span>
      <Button
        variant="danger"
        onClick={(evt) => {
          onClick(evt, false);
        }}
      >
        &darr;
      </Button>
    </>
  );
}

export default QtyChangeWidget;
