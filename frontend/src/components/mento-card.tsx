import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function MentorCard() {
  const [showAll, setShowAll] = useState(false);

  const skills = [
    "Job Placements",
    "Growth Marketing",
    "Product Development",
    "Product Incubation",
    "App Store Optimization",
    "User Acquisition",
    "Analytics",
  ];

  const visibleSkills = showAll ? skills : skills.slice(0, 5);

  return (
    <Card className="w-full max-w-sm ">
      <CardContent className="">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-20 h-20 rounded-md">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
              alt="Tanvi Butalia"
            />
            <AvatarFallback>TB</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Tanvi Butalia</h3>
            <Badge className="bg-green-500 mt-1">New</Badge>
            <p className="text-sm mt-2 line-clamp-1">
              Empowered over 300 students to land their dream jobs
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={"/"}>
          <Button className="">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
