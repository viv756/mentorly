import { Link } from "react-router-dom";
import { Circle, CircleCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { User } from "@/features/user/types";
import { Button } from "@/components/ui/button";

type ProfileCompletenessProps = {
  user: User;
};

const ProfileCompleteness = ({ user }: ProfileCompletenessProps) => {
  const hasAvailability =
    user?.weeklyAvailability &&
    Object.values(user.weeklyAvailability).some((day) => day.length > 0);

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-xl">Complete Your Profile</CardTitle>
        <CardDescription>Complete your profile to increase your profile view</CardDescription>
        <Progress value={user && user.profileCompleteness} />
      </CardHeader>
      <CardContent>
        <div>
          <Accordion type="single" collapsible defaultValue="availability" className="max-w-lg">
            <AccordionItem value="availability">
              <AccordionTrigger className="hover:no-underline!">
                {hasAvailability ? (
                  <span className="flex items-center gap-4 justify-center">
                    <CircleCheck size={20} color="green" /> Add Availability
                  </span>
                ) : (
                  <span className="flex items-center gap-4 justify-center">
                    <Circle size={20} /> Add Availability
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Set your available time slots for appointments or meetings. This helps others see
                  when you're free and schedule sessions accordingly.
                </p>
                {!hasAvailability && (
                  <Link to={"/calendar"}>
                    <Button className="mt-4 bg-black dark:bg-white dark:text-black pointer-events-none">
                      Complete
                    </Button>
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="profile-pic">
              <AccordionTrigger className="hover:no-underline!">
                {user && user.avatar ? (
                  <span className="flex items-center gap-4 justify-center">
                    <CircleCheck size={20} color="green" /> Complete your profile
                  </span>
                ) : (
                  <span className="flex items-center gap-4 justify-center">
                    <Circle size={20} /> Complete your profile
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Add profile pic and personal details to make your profile more professional and
                  help others recognize you.
                </p>
                {user && !user.avatar && (
                  <Link to={"/profile"}>
                    <Button className="mt-4 bg-black dark:bg-white dark:text-black pointer-events-none">
                      Complete
                    </Button>
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="add-skills">
              <AccordionTrigger className="hover:no-underline!">
                {user && user.skillId?.length > 0 ? (
                  <span className="flex items-center gap-4 justify-center">
                    <CircleCheck size={20} color="green" /> Add your skills
                  </span>
                ) : (
                  <span className="flex items-center gap-4 justify-center">
                    <Circle size={20} /> Add your skills
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Showcase your expertise by adding relevant skills to your profile. This helps
                  others understand your capabilities
                </p>
                {user && user.skillId?.length === 0 && (
                  <Link to={"/skills"}>
                    <Button className="mt-4 bg-black dark:bg-white dark:text-black pointer-events-none">
                      Complete
                    </Button>
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteness;
