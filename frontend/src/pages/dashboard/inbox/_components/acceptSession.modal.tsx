import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type AcceptSessionRequestModalProps = {
  learnerId: string,
  sessionId:string
}


const AcceptSessionRequestModal = ({ learnerId, sessionId }:AcceptSessionRequestModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Accept</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Learning Session Required</DialogTitle>
          <DialogDescription>
            Accepting the session requires creating a learning session with the user.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button>
            <Link
              to={`/learner-profile/${learnerId}/session/${sessionId}`}
              className="flex gap-1 items-center  ">
              Go
              <ArrowRight />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptSessionRequestModal;
