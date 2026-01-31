import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { AUTH_ROUTES } from "./common/routePath";
import Loader from "@/components/ui/loader";

const ProtectedRoute = () => {
  const { accessToken, isAuthInitializing } = useAuthStore();

  if (isAuthInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader title="Configuring your dashboard" />
      </div>
    );
  }

  if (accessToken) return <Outlet />;

  return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
};

export default ProtectedRoute;
