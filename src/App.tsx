import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageContent from "./components/PageContent/PageContent";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";
import { setCurrentCatalogPage } from "./app/slices/catalogSlice";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { getShopDetails } from "./app/shopThunks";
import { useEffect } from "react";

function App() {
  const currentCatalogPage = useAppSelector(
    (state: RootState) => state.catalog.currentCatalogPage
  );
  const shopTitle = useAppSelector((state: RootState) => state.shop.title);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getShopDetails({ shopId: 2 }));
  }, [shopTitle]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <PageContent
          currentCatalogPage={currentCatalogPage}
          switchCatalogPage={setCurrentCatalogPage}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
