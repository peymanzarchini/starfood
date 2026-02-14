import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <h1>About-us</h1>
          </Suspense>
        ),
      },
    ],
  },
]);
