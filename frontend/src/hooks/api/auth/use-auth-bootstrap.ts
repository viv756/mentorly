import { useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { useGetCurrentUser } from "../user/use-get-current-user";

export const useAuthBootstrap = () => {
  const { accessToken, setUser, user } = useAuthStore();

  const { data, isSuccess } = useGetCurrentUser();
  useEffect(() => {
    if (!accessToken || !isSuccess || !data) return;

    // Prevent unnecessary overwrite
    if (user?.userId === data.user.userId) return;

    setUser(data.user);
  }, [accessToken, isSuccess, data, user, setUser]);
};
