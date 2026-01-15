import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "@/layout/base-layout";
import AppLayout from "@/layout/app-layout";
import { authenticationRoutePaths, protectedRoutes, publicRoutePaths } from "./common/routes";
import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";
import { useTokenRefreshTimer } from "@/hooks/api/auth/use-token-refresh";
import { useAuthInit } from "@/hooks/api/auth/use-auth-init";
import { useAuthBootstrap } from "@/hooks/api/auth/use-auth-bootstrap";

const AppRoutes = () => {
  useAuthInit(); // Refresh if cookie exist
  useTokenRefreshTimer(); // Refresh while logged in
  useAuthBootstrap(); // Fetch current user data

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<BaseLayout />}>
          {publicRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Authentication routes */}
        <Route element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
