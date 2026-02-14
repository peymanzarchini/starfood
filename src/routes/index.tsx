import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import ProductDetailsPage from "@/pages/ProductDetails";
import RegisterPage from "@/pages/Register";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import ProfilePage from "@/pages/Profile";
import CartPage from "@/pages/Cart";
import OrdersPage from "@/pages/Orders";
import FavoritePage from "@/pages/Favorite";
import { AdminRoute } from "./AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboard";
import AdminProductsPage from "@/pages/admin/AdminProducts";
import AdminOrdersPage from "@/pages/admin/AdminOrders";
import AdminUsersPage from "@/pages/admin/AdminUsers";
import AdminCategoriesPage from "@/pages/admin/AdminCategories";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <h1>About-us</h1>
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "cart",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <CartPage />
              </Suspense>
            ),
          },
          {
            path: "orders",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <OrdersPage />
              </Suspense>
            ),
          },
          {
            path: "favorites",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <FavoritePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AdminProductsPage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AdminOrdersPage />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AdminUsersPage />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AdminCategoriesPage />
          </Suspense>
        ),
      },
    ],
  },
]);
