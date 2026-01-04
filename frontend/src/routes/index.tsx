import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "@/layout/base-layout";
import { authenticationRoutePaths } from "./common/routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          {authenticationRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
