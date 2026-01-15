export type User = {
  userId: string;
  profileId: string;
  userName: string;
  userEmail: string;
  avatar: string;
};

export type GetCurrentUserResponseType = {
  message: string;
  user: User;
};
