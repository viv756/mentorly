import { useAuthStore } from "@/store/store";
import ProfileCompleteness from "./_components/profile-completeness";
import type { User } from "@/features/user/types";

const Overview = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <h1 className="py-10 text-4xl font-semibold text-foreground">Hi, {user?.userName}</h1>
      <ProfileCompleteness user={user as User} />
    </div>
  );
};

export default Overview;
