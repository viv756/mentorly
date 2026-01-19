import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const SkillCard = () => {
  return (
    <Card className="w-full max-w-md shadow-lg ">
      <CardContent className="">
        <h2 className="text-3xl font-bold mb-4 leading-tight">React</h2>
        <p className=" mb-8">
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing,
          and web development.
        </p>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm font-medium">
              Popular
            </Badge>
            <div className="bg-black text-white rounded-full size-8 flex items-center justify-center">
              <ArrowRight />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
