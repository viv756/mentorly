import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Target } from "lucide-react";
import React from "react";
import DeclineSessionRequestModal from "./declineSessionRequest-modal";

const SessionRequestCard = () => {
  return (
    <Card className="max-w-xl">
      <CardHeader className="flex items-center gap-3">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src="https://media.istockphoto.com/id/2193991190/photo/smiling-asian-female-entrepreneur-working-on-touchpad-in-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=lsD2QRQfHehFV0y98Xz1tsDnoFZkkT1h5VzcCV3DgMM="
            className=" object-cover "
          />
        </Avatar>
        <div>
          <p>Name</p>
          <p className="text-sm text-muted-foreground "> 2 mins ago</p>
          <p className="text-sm line-clamp-2">
            {" "}
            You want session requests for a mentor, and for each learnerId, also attach their
            profile from ProfileModel using MongoDB aggregation.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Skill Requested - Highlighted */}
        <div className="bg-linear-to-r from-secondary to-pink-100 rounded-lg p-4 mb-4 border-2 border-secondary">
          <div className="flex items-center gap-2 mb-2">
            <Target size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">Wants to Learn: React</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock size={12} />
              09:00 AM
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <DeclineSessionRequestModal />
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  );
};

export default SessionRequestCard
