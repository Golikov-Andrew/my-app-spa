import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { setCurrentCatalogPage } from "../../../app/slices/catalogSlice";
import type { RootState } from "../../../app/store";
import { fetchProducts } from "../../../app/catalogThunks";
import Title from "../Title/Title";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

import ProductList from "../../ProductList/ProductList";
import Pagination from "../../Pagination/Pagination";

type Props = {
  page: number;
  switchCatalogPage: typeof setCurrentCatalogPage;
};

function AdminProducts({ page, switchCatalogPage }: Props) {
  const totalPages = useAppSelector(
    (state: RootState) => state.catalog.totalPages
  );
  const products = useAppSelector((state: RootState) => state.catalog.products);
  const loading = useAppSelector((state: RootState) => state.catalog.loading);
  const error = useAppSelector((state: RootState) => state.catalog.error);
  const priceFrom = useAppSelector(
    (state: RootState) => state.catalog.filtersForm.priceFrom
  );
  const priceTo = useAppSelector(
    (state: RootState) => state.catalog.filtersForm.priceTo
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page, priceFrom, priceTo }));
  }, [page, dispatch]);

  let tempMessage = null;

  if (loading) tempMessage = "Подождите загрузки продуктов...";
  if (error) tempMessage = `Во время загрузки произошла ошибка: ${error}`;

  return (
    <>
      <Title text="Админка - Товары" />
      <div className="catalog container-fluid">
        <div className="row">
          <div className="col-3 d-flex flex-column">
            <LeftSideBar />
          </div>
          <div className="col-9">
            {tempMessage !== null && (
              <div className="catalog d-flex justify-content-center m-4">
                {tempMessage}
              </div>
            )}
            {tempMessage === null && (
              <>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  switchCatalogPage={switchCatalogPage}
                />
                <ProductList products={products} isUserAdmin={true} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
