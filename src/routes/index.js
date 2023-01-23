import * as React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import CartPage from "../pages/CartPage";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import HomePage from "../pages/HomePage";
import UserProfilePage from "../pages/UserProfilePage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage"
import SearchPage from "../pages/SearchPage";
import DashboardPage from "../pages/Dashboard/DashboardPage"
import ProductPage from "../pages/Dashboard/ProductPage"
import EditProductPage from "../pages/Dashboard/EditProductPage"
import CreateProductPage from "../pages/Dashboard/CreateProductPage"
import EditOrderPage from "../pages/Dashboard/EditOrderPage"
import UserPage from "../pages/Dashboard/UserPage"
import DashboardLayout from "../layouts/DashboardLayout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="profile"
          element={
            <AuthRequire>
              <UserProfilePage />
             </AuthRequire>
          }
        />
        <Route path="product/:id" element={<DetailPage />} />
        <Route
          path="order"
          element={
            <AuthRequire>
              <OrderPage />
            </AuthRequire>
          }
        />
        <Route
          path="checkout"
          element={
            <AuthRequire>
              <CartPage />
           </AuthRequire>
          }
        />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <AuthRequire>
            <DashboardLayout />
          </AuthRequire>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="products/add" element={<CreateProductPage />} />
        <Route path="order" element={<EditOrderPage />} />
        <Route path="user" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
