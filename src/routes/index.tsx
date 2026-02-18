import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
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
import FoodsPage from "@/pages/Foods";
import FoodDetailsPage from "@/pages/FoodDetails";
import CheckoutPage from "@/pages/Checkout";
import OrderDetailsPage from "@/pages/OrderDetails";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/ui/customs/Loading";

const AboutUsPage = lazy(() => import("@/pages/AboutUs"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "about-us",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      { path: "foods", element: <FoodsPage /> },
      { path: "foods/:id", element: <FoodDetailsPage /> },

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
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrderDetailsPage /> },
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
