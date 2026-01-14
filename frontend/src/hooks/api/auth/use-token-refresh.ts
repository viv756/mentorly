import { useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { refreshToken } from "@/features/auth/api/refreshTokenAPI";

const REFRESH_BUFFER = 60 * 1000; // 1 min before expiry

export const useTokenRefreshTimer = () => {
  const { accessToken, accessTokenExpiresAt, setCredentials, logout } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !accessTokenExpiresAt) return;

    const now = Date.now();
    const delay = accessTokenExpiresAt - now - REFRESH_BUFFER;

    if (delay <= 0) {
      refreshToken()
        .then(({ accessToken, expiresAt }) => setCredentials(accessToken, expiresAt))
        .catch(logout);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        console.log("🔥 Refresh token timeout fired");
        const data = await refreshToken();
        setCredentials(data.accessToken, data.expiresAt);
      } catch {
        logout();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [accessToken, accessTokenExpiresAt]);
};
