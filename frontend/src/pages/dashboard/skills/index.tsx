import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewSkill from "./_components/add-new-skill";
import { useGetCurrentUserSkills } from "@/hooks/api/skills/use-get-current-user-skills";
import UserSkillsSection from "./_components/userSkillsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillCardSkelton } from "./_components/skill-card";

const UserSkills = () => {
  const { data, isLoading } = useGetCurrentUserSkills();

  if (isLoading || !data) {
    return (
      <>
        <div className="flex justify-between items-center py-10">
          <h1 className="text-4xl font-bold tracking-wide">Your Skills</h1>
          <Skeleton className="h-10 w-40 " />
        </div>
        <Tabs defaultValue="learn" className="w-full">
          <TabsList>
            <TabsTrigger value="learn">Learning Goals</TabsTrigger>
            <TabsTrigger value="teach">Mentoring Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="learn">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkillCardSkelton key={i} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="teach">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkillCardSkelton key={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center py-10">
        <h1 className="text-4xl font-bold tracking-wide">Your Skills</h1>
        <AddNewSkill />
      </div>
      <Tabs defaultValue="learn" className="w-full">
        <TabsList>
          <TabsTrigger value="learn">Learning Goals</TabsTrigger>
          <TabsTrigger value="teach">Mentoring Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="learn">
          <UserSkillsSection skills={data.learningGoals} type="LEARN" />
        </TabsContent>
        <TabsContent value="teach">
          <UserSkillsSection skills={data.mentoringGoals} type="TEACH" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UserSkills;
