import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routePath";

import Home from "@/pages/home";
import SignUp from "@/pages/auth/sign-up";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/dashboard/overview";
import Profile from "@/pages/dashboard/profile";
import Search from "@/pages/dashboard/search";
import UserSkills from "@/pages/dashboard/skills";
import Account from "@/pages/dashboard/settings/account";
import Advanced from "@/pages/dashboard/settings/advanced";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <Home /> }];

// SignIn and SignUp routes
export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

// protected routes - user can only access these routes after login
export const protectedRoutes = [
  { path: PROTECTED_ROUTES.OVERVIEW, element: <Overview /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
  { path: PROTECTED_ROUTES.SEARCH, element: <Search /> },
  { path: PROTECTED_ROUTES.SKILLS, element: <UserSkills /> },
  { path: PROTECTED_ROUTES.ACCOUNT, element: <Account /> },
  { path: PROTECTED_ROUTES.ADVANCED, element: <Advanced /> },
];
