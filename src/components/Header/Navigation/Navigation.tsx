import { shopPages } from "../../../siteConfig";
import { useAppDispatch } from "../../../app/hooks";
import type { setCurrentShopPage } from "../../../app/slices/sitePagesSlice";

type NavigationProps = {
  currentShopPage: shopPages;
  onClick: typeof setCurrentShopPage;
};

function Navigation({ currentShopPage, onClick }: NavigationProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="navigation container-fluid m-2 p-2 pt-3 d-flex align-items-center">
      <div className="row">
        <div className="col-6">
          <button
            className={
              currentShopPage === shopPages.HOMEPAGE
                ? "btn btn-danger"
                : "btn btn-outline-danger"
            }
            onClick={()=>{dispatch(onClick(shopPages.HOMEPAGE))}}
          >
            Homepage
          </button>
        </div>
        <div className="col-6">
          <button
            className={
              currentShopPage === shopPages.CATALOG
                ? "btn btn-danger"
                : "btn btn-outline-danger"
            }
            onClick={()=>{dispatch(onClick(shopPages.CATALOG))}}
          >
            Catalog
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
