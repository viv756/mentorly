import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routePath";

import Home from "@/pages/home";
import SignUp from "@/pages/auth/sign-up";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/dashboard/overview";
import Profile from "@/pages/dashboard/profile";
import FindPeople from "@/pages/dashboard/find-people";
import UserSkills from "@/pages/dashboard/skills";
import Account from "@/pages/dashboard/settings/account";
import Advanced from "@/pages/dashboard/settings/advanced";
import Calendar from "@/pages/dashboard/calendar";
import UserProfile from "@/pages/user-profile";
import ScheduleMeeting from "@/pages/schedule-meeting";

export const publicRoutePaths = [{ path: PUBLIC_ROUTES.HOME, element: <Home /> }];

// SignIn and SignUp routes
export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedBaseLayoutRoutes = [
  { path: PROTECTED_ROUTES.USER_PROFILE, element: <UserProfile /> },
  { path: PROTECTED_ROUTES.SCHEDULE_MEETING, element: <ScheduleMeeting /> },
];

// protected routes - user can only access these routes after login
export const protectedAppLayoutRoutes = [
  { path: PROTECTED_ROUTES.OVERVIEW, element: <Overview /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
  { path: PROTECTED_ROUTES.CALENDAR, element: <Calendar /> },
  { path: PROTECTED_ROUTES.FIND_PEOPLE, element: <FindPeople /> },
  { path: PROTECTED_ROUTES.SKILLS, element: <UserSkills /> },
  { path: PROTECTED_ROUTES.ACCOUNT, element: <Account /> },
  { path: PROTECTED_ROUTES.ADVANCED, element: <Advanced /> },
];
