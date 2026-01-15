import { create } from "zustand";
import type { User } from "@/features/user/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthInitializing: boolean;
  setCredentials: (token: string, expiresAt: number, user?: User) => void;
  finishAuthInit: () => void;
  accessTokenExpiresAt: number | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  accessTokenExpiresAt: null,
  isAuthInitializing: true,

  setCredentials: (token, expiresAt, user) =>
    set({ accessToken: token, accessTokenExpiresAt: expiresAt, user: user }),

  finishAuthInit: () => set({ isAuthInitializing: false }),

  setUser: (user) => set({ user }),

  logout: () =>
    set({ accessToken: null, accessTokenExpiresAt: null, user: null, isAuthInitializing: false }),
}));
