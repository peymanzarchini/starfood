import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
