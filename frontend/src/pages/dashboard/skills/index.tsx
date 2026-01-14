import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningGoals from "./_components/learning-goals";
import AddNewSkill from "./_components/add-new-skill";

const UserSkills = () => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-wide">Your Skills</h1>
        <AddNewSkill />
      </div>
      <Tabs defaultValue="learn" className="w-full mt-10">
        <TabsList>
          <TabsTrigger value="learn">Learning Goals</TabsTrigger>
          <TabsTrigger value="teach">Mentoring Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="learn">
          <LearningGoals />
        </TabsContent>
        <TabsContent value="teach">
          <LearningGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSkills
