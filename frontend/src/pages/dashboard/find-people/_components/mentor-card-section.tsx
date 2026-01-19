import MentorCard from "@/components/mento-card";
import type { MatchedUser } from "@/features/user/types";
import { useGetFindPeople } from "@/hooks/api/user/use-find-people";

const MentorCardSection = () => {
  const { data, isLoading } = useGetFindPeople();

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const users = data.users;

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map((user: MatchedUser) => (
        <MentorCard user={user} />
      ))}
    </div>
  );
};

export default MentorCardSection;
