import { useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { useGetCurrentUser } from "../user/use-get-current-user";

export const useAuthBootstrap = () => {
  const { accessToken, user, setUser } = useAuthStore();
  const { data, isSuccess } = useGetCurrentUser();

  useEffect(() => {
    if (!accessToken || user) return;

    if (isSuccess && data) {
      setUser(data.user);
    }
  }, [accessToken, isSuccess, data, user]);
};
