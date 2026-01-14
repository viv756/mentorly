import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/store";
import { refreshToken } from "@/features/auth/api/refreshTokenAPI";

export const useAuthInit = () => {
  const { accessToken, setCredentials, finishAuthInit, logout } = useAuthStore();
  
  const hasTriedInitialRefresh = useRef(false);

  useEffect(() => {
    if (accessToken || hasTriedInitialRefresh.current) {
      finishAuthInit();
      return;
    }

    hasTriedInitialRefresh.current = true;

    refreshToken()
      .then(({ accessToken, expiresAt }) => {
        setCredentials(accessToken, expiresAt);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        finishAuthInit();
      });
  }, [accessToken]);
};
