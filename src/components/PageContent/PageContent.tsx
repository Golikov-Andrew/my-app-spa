import { Route, Routes } from "react-router-dom";
import type { setCurrentCatalogPage } from "../../app/slices/catalogSlice";

import Catalog from "./Catalog/Catalog";
import Homepage from "./Homepage/Homepage";

import LoginForm from "./Auth/Login/LoginForm";
import Register from "./Auth/Register/RegisterForm";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Account from "./Account/Account";
import Logout from "./Auth/Logout/Logout";
import "./PageContent.css";

type PageContentProps = {
  currentCatalogPage: number;
  switchCatalogPage: typeof setCurrentCatalogPage;
};

function PageContent({
  currentCatalogPage,
  switchCatalogPage,
}: PageContentProps) {

  return (
    <>
      <div className="page-content container-fluid mb-5 pt-2 pb-5">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="catalog" element={ <Catalog page={currentCatalogPage} switchCatalogPage={switchCatalogPage} />}/>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default PageContent;
