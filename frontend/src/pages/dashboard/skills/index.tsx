import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewSkill from "./_components/add-new-skill";
import { useGetCurrentUserSkills } from "@/hooks/api/skills/use-get-current-user-skills";
import UserSkillsSection from "./_components/userSkillsSection";

const UserSkills = () => {
  const { data, isLoading } = useGetCurrentUserSkills();

  if (isLoading || !data) {
    return <div>loading</div>;
  }

  return (
    <div className="">
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
    </div>
  );
};

export default UserSkills;
