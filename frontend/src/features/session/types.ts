export type CreateSessionPayload = {
  mentorId: string;
  learnerId: string;
  date: string;
  to: string;
  from: string;
  timezone: string;
  skillId: string;
};

export type CreateAcceptSessionPayload = {
  mentorId: string;
  sessionId: string;
  learnerId: string;
  date: string;
  to: string;
  from: string;
  timezone: string;
  skillId: string;
};
