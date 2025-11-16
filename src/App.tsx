import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageContent from "./components/PageContent/PageContent";
import { useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";
import { setCurrentCatalogPage } from "./app/slices/catalogSlice";
import { BrowserRouter } from "react-router-dom";

function App() {
  
  const currentCatalogPage = useAppSelector(
    (state: RootState) => state.catalog.currentCatalogPage
  );

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
