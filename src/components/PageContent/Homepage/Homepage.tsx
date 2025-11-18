import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { getShopDetails } from "../../../app/shopThunks";
import parse from "html-react-parser";

function Homepage() {
  const description = useAppSelector(
    (state: RootState) => state.shop.description
  );

  return (
    <div className="homepage text-center m-4 col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
      {parse(description)}
    </div>
  );
}

export default Homepage;
