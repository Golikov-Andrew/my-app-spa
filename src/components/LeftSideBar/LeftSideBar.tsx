import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import { setFiltersFormData } from "../../app/slices/catalogSlice";
import { fetchProducts } from "../../app/catalogThunks";

function LeftSideBar() {
  const dispatch = useAppDispatch();
   const formData = useAppSelector(
      (state: RootState) => state.catalog.filtersForm
    );
    const priceFrom = useAppSelector(
      (state: RootState) => state.catalog.filtersForm.priceFrom
    );
    const priceTo = useAppSelector(
      (state: RootState) => state.catalog.filtersForm.priceTo
    );
    const page = useAppSelector(
      (state: RootState) => state.catalog.currentCatalogPage
    );

  const handleChangeForm = (e: any) => {
    dispatch(
      setFiltersFormData({ ...formData, [e.target.name]: +e.target.value })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(fetchProducts({ ...formData, page }));
  };

  return (
    <div className="px-4 position-fixed start-0 col-3 d-flex flex-column">
      <h4>Фильтры</h4>
      
      <Form onSubmit={handleSubmit}>
        <Form.Label>Цена от: {priceFrom}</Form.Label>
        <Form.Range
          value={priceFrom}
          onChange={handleChangeForm}
          min="0"
          max="30000"
          step="1000"
          name="priceFrom"
        />

        <Form.Label>Цена до: {priceTo}</Form.Label>
        <Form.Range
          value={priceTo}
          onChange={handleChangeForm}
          min="0"
          max="30000"
          step="1000"
          name="priceTo"
        />
        
        <Button variant="danger" type="submit">
          Применить
        </Button>
      </Form>
    </div>
  );
}

export default LeftSideBar;
