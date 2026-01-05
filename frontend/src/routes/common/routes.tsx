import { AUTH_ROUTES, PUBLIC_ROUTES } from "./routePath";

import SignUp from "@/pages/auth/sign-up";
import SignIn from "@/pages/auth/sign-in";
import Home from "@/pages/Home";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <Home /> }];

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];
