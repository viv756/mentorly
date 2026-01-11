import { Briefcase, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillCard = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-bold">React</CardTitle>
          <Badge variant="secondary" className="text-xs font-semibold">
            Beginner
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed ">
          React is a popular, open-source JavaScript library for building interactive and reusable
          user interfaces (UIs) through a component-based structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm ">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Business</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-medium">2 years exp</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
