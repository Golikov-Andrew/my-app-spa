import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageContent from "./components/PageContent/PageContent";
import { useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";
import { setCurrentShopPage } from "./app/slices/sitePagesSlice";
import { setCurrentCatalogPage } from "./app/slices/catalogSlice";

function App() {
  const currentShopPage = useAppSelector(
    (state: RootState) => state.sitePages.currentShopPage
  );
  const currentCatalogPage = useAppSelector(
    (state: RootState) => state.catalog.currentCatalogPage
  );

  return (
    <div className="App">
      <Header currentShopPage={currentShopPage} onClick={setCurrentShopPage} />
      <PageContent
        currentShopPage={currentShopPage}
        currentCatalogPage={currentCatalogPage}
        switchCatalogPage={setCurrentCatalogPage}
      />
      <Footer />
    </div>
  );
}

export default App;
