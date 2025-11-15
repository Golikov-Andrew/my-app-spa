import ProductList from "../../ProductList/ProductList";
import Pagination from "../../Pagination/Pagination";
import { useEffect } from "react";
import type { Product } from "../../../types/Product";
import {type setCurrentCatalogPage} from "../../../app/slices/catalogSlice";
import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProducts } from "../../../app/catalogThunks";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ page }));
  }, [page, dispatch]);

  if (loading) return <div className="catalog d-flex justify-content-center m-4">Подождите загрузки продуктов...</div>;
  if (error)
    return <div className="catalog d-flex justify-content-center m-4">Во время продуктов произошла ошибка: {error}</div>;

  return (
    <div className="catalog">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        switchCatalogPage={switchCatalogPage}
      />
      <ProductList products={products} />
    </div>
  );
}

export type { Product };
export default Catalog;
