export const PUBLIC_ROUTES = {
  HOME: "/",
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  OVERVIEW: "/overview",
  PROFILE: "/profile",
  CALENDAR: "/calendar",
  SKILLS: "/skills",
  INBOX: "/inbox",
  MEETINGS: "/meetings",
  FIND_PEOPLE: "/find-people",
  USER_PROFILE: "/user/:userId",
  SCHEDULE_MEETING: "/user/:userId/skill/:skillId",
  LEARNER_PROFILE: "/learner-profile/:learnerId/session/:sessionId",
  CREATE_SESSION:"/create-session/:sessionId/skill/:skillId/learner/:learnerId",
  ACCOUNT: "/account",
  ADVANCED: "/advanced",
};
