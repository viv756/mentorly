// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUserFn } from "@/features/user/api/getCurrentUserAPI";
// import { useAuthStore } from "@/store/store";

// export const useGetCurrentUser = () => {
//   const accessToken = useAuthStore((state) => state.accessToken);

//   const query = useQuery({
//     queryKey: ["auth-user"],
//     queryFn: getCurrentUserFn,
//     enabled: !!accessToken,
//     retry: 2,
//     staleTime: 0,

//   });

//   return query;
// };

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCurrentUserFn } from "@/features/user/api/getCurrentUserAPI";
import { useAuthStore } from "@/store/store";

export const useGetCurrentUser = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: getCurrentUserFn,
    enabled: !!accessToken,
    retry: 2,
    staleTime: 0,
  });

  useEffect(() => {
    if (!query.data?.user) return;

    // prevent unnecessary overwrite
    // if (user?.userId === query.data.user.userId) return;

    setUser(query.data.user);
  }, [query.data, user, setUser]);

  return query;
};
