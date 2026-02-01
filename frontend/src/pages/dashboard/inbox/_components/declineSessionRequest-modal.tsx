import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useRejectSessionRequest } from "@/hooks/api/session/use-rejectSessionRequest";

interface DeclineSessionRequestModalProps {
  sessionId: string;
}

const DeclineSessionRequestModal = ({ sessionId }: DeclineSessionRequestModalProps) => {
  const { mutate: rejectSession, isPending } = useRejectSessionRequest();

  const handleSubmit = () => {
    rejectSession(sessionId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Decline</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will also decline the request.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant={"ghost"} type="button">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="w-20">
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineSessionRequestModal;
