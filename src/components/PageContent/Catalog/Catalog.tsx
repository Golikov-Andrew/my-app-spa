import ProductList from "../../ProductList/ProductList";
import Pagination from "../../Pagination/Pagination";
import { useEffect } from "react";
import type { Product } from "../../../types/Product";
import { type setCurrentCatalogPage } from "../../../app/slices/catalogSlice";
import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProducts } from "../../../app/catalogThunks";
import Title from "../Title/Title";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";

type CatalogProps = {
  page: number;
  switchCatalogPage: typeof setCurrentCatalogPage;
};

function Catalog({ page, switchCatalogPage }: CatalogProps) {
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
  // return <div className="catalog d-flex justify-content-center m-4"></div>;
  if (error) tempMessage = `Во время загрузки произошла ошибка: ${error}`;
  // return <div className="catalog d-flex justify-content-center m-4"></div>;

  return (
    <>
      <Title text="Каталог" />
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
              <><Pagination
                currentPage={page}
                totalPages={totalPages}
                switchCatalogPage={switchCatalogPage} /><ProductList products={products} /></>
            )}

            
          </div>
        </div>
      </div>
    </>
  );
}

export type { Product };
export default Catalog;
