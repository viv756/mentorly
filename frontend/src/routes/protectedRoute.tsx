import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { AUTH_ROUTES } from "./common/routePath";

const ProtectedRoute = () => {
  const { accessToken, isAuthInitializing } = useAuthStore();

  if (isAuthInitializing) {
    return <div>Loading...</div>;
  }

  if (accessToken) return <Outlet />;

  return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
};

export default ProtectedRoute;
