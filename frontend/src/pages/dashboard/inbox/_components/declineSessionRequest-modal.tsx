import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const { mutate: rejectSession, isPending } = useRejectSessionRequest();

  const handleSubmit = () => {
    rejectSession(sessionId, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Decline</Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will also decline the request.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button
              className="sm:flex-none sm:w-auto"
              variant={"ghost"}
              type="button"
              onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            className=" sm:flex-none sm:w-20"
            onClick={handleSubmit}
            disabled={isPending}>
            {isPending ? <Spinner /> : "  Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineSessionRequestModal;
