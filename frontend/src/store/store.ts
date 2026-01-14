import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setCredentials: (token: string, expiresAt: number, user?: User) => void;
  accessTokenExpiresAt: number | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  accessTokenExpiresAt: null,

  setCredentials: (token, expiresAt, user) =>
    set({ accessToken: token, accessTokenExpiresAt: expiresAt, user: user }),

  setUser: (user) => set({ user }),

  logout: () => set({ user: null, accessToken: null }),
}));
