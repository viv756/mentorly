import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routePath";

import Home from "@/pages/home";
import SignUp from "@/pages/auth/sign-up";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/dashboard/overview";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <Home /> }];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutes = [{ path: PROTECTED_ROUTES.OVERVIEW, element: <Overview /> }];
