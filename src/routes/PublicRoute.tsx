import { useAuth } from "@/modules/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PublicRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
