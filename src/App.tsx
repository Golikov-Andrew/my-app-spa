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
import { sessionBegin } from "./app/slices/authSlice";
import { sessionBeginThunk } from "./app/authThunks";

function App() {
  const currentCatalogPage = useAppSelector(
    (state: RootState) => state.catalog.currentCatalogPage
  );
  const shopTitle = useAppSelector((state: RootState) => state.shop.title);
  const username = useAppSelector((state: RootState) => state.auth.username);

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  if (token && username === null) {
    dispatch(sessionBeginThunk({ token }));
  }

  useEffect(() => {
    dispatch(getShopDetails({ shopId: 1 }));
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
