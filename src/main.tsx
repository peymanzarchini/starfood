import React from "react";
import ReactDOM from "react-dom/client";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { routes } from "./routes";
import "./index.css";
import ToasterProvider from "./components/ui/Sonner";
import { AuthProvider } from "./modules/auth";
import { handleApiError } from "./utils/handleApiError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleApiError(error, "Failed to fetch data");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleApiError(error, "Action failed");
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToasterProvider />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
