import MentorCard from "@/components/mento-card";
import { useGetFindPeople } from "@/hooks/api/user/use-find-people";
import type { MatchedUser } from "@/features/user/types";

const MentorCardSection = () => {
  const { data, isLoading } = useGetFindPeople();

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const users = data.users;

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {users.map((user: MatchedUser) => (
        <MentorCard key={user.userId} user={user} />
      ))}
    </div>
  );
};

export default MentorCardSection;
