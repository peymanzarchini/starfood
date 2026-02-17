import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
import ProductDetailsPage from "@/pages/ProductDetails";
import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import ProfilePage from "@/pages/Profile";
import CartPage from "@/pages/Cart";
import OrdersPage from "@/pages/Orders";
import FavoritePage from "@/pages/Favorite";
import { AdminRoute } from "./AdminRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboard";
import AdminProductsPage from "@/pages/admin/AdminProducts";
import AdminCategoriesPage from "@/pages/admin/AdminCategories";
import AdminOrdersPage from "@/pages/admin/AdminOrders";
import AdminUsersPage from "@/pages/admin/AdminUsers";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about-us", element: <h1>About Us</h1> },
      { path: "product/:id", element: <ProductDetailsPage /> },

      // --- Guest Only Routes ---
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },

      // --- Authenticated Customer Routes ---
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "cart", element: <CartPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "favorites", element: <FavoritePage /> },
        ],
      },
    ],
  },

  // --- Admin Only Routes ---
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "products", element: <AdminProductsPage /> },
          { path: "categories", element: <AdminCategoriesPage /> },
          { path: "orders", element: <AdminOrdersPage /> },
          { path: "users", element: <AdminUsersPage /> },
        ],
      },
    ],
  },
]);
