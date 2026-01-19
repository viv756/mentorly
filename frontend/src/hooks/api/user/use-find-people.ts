import { getFindPeopleApiFn } from "@/features/user/api/getFindPeople";
import { useQuery } from "@tanstack/react-query";

export const useGetFindPeople = () => {
  const query = useQuery({
    queryKey: ["find-people"],
    queryFn: getFindPeopleApiFn,
  });

  return query
};
