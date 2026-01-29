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

export type Session = {
  _id: string;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
  learnerId: string;
  mentor: {
    _id: string;
    createdAt: Date;
    lastActiveAt: string;
    name: string;
    updatedAt: Date;
    profile: {
      _id: string;
      avatar: string;
      bio: string;
    };
  };
  learner: {
      _id: string;
    createdAt: Date;
    lastActiveAt: string;
    name: string;
    updatedAt: Date;
    profile: {
      _id: string;
      avatar: string;
      bio: string;
    };
  }
  mentorId: string;
  scheduledAt: Date;
  sessionType: string;
  sessionTypeLabel: string;
  skill: {
    skillName: string;
    description: string;
    _id: string;
  };
  status: string;
  video: {
    provider: string;
    roomId: string;
    _id: string;
  };
};

export type UpcomingType = Session[];
export type RequestedType = Session[];

export type GetUpcomingAndRequestedApiResponseType = {
  message: string;
  sessions: [
    {
      upcoming: UpcomingType;
      requested: RequestedType;
    },
  ];
};
