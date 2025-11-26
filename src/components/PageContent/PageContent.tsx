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
import ProductPage from "./ProductPage/ProductPage";
import WishList from "./WishList/WishList";
import Cart from "./Cart/Cart";
import Orders from "./Orders/Orders";
import OrderPage from "./OrderPage/OrderPage";
import AdminOrders from "./Orders/AdminOrders";
import AdminShop from "./Admin/AdminShop";
import AdminProducts from "./Admin/AdminProducts";

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
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path="wishlist" element={<PrivateRoute><WishList /></PrivateRoute>} />
          <Route path="cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="admin/orders" element={<PrivateRoute isAdminPath={true}><AdminOrders/></PrivateRoute>} />
          <Route path="admin/shop" element={<PrivateRoute isAdminPath={true}><AdminShop /></PrivateRoute>} />
          <Route path="admin/products" element={<PrivateRoute isAdminPath={true}><AdminProducts page={currentCatalogPage} switchCatalogPage={switchCatalogPage} /></PrivateRoute>} />
          <Route path="order/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default PageContent;
