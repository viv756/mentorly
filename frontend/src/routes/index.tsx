import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "@/layout/base-layout";
import AppLayout from "@/layout/app-layout";
import { authenticationRoutePaths, protectedRoutes, publicRoutePaths } from "./common/routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          {publicRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<BaseLayout />}>
          {authenticationRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<AppLayout />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
