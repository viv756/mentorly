import { AUTH_ROUTES } from "./routePath";

import SignUp from "@/pages/auth/sign-up";
import SignIn from "@/pages/auth/sign-in";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];
