import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import { getShopDetails } from "../../../app/shopThunks";

function AdminShop() {
  const balance = useAppSelector(
    (state: RootState) => state.shop.balance
  );
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getShopDetails({ shopId: 1 }));
    }, []);

  return (
    <div className="homepage text-center m-4 col-12 col-sm-10 col-md-8 col-lg-6 mx-auto fs-1">
      Баланс магазина: {balance} &#8381;
    </div>
    
  );
}

export default AdminShop;
