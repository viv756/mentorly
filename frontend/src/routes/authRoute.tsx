import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { PUBLIC_ROUTES } from "./common/routePath";

const AuthRoute = () => {
  const { accessToken, user } = useAuthStore();
  
  if (!accessToken && !user) return <Outlet />;

  return <Navigate to={PUBLIC_ROUTES.HOME} replace />;
};

export default AuthRoute;
