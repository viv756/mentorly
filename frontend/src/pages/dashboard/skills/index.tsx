import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningGoals from "./_components/learning-goals";
import { Button } from "@/components/ui/button";

const Skills = () => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Your Skills</h1>
        <Button>Add new skill</Button>
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

export default Skills;
