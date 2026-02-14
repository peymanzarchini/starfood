import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
