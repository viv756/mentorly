import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import { useCancelSessionRequest } from "@/hooks/api/session/use-cancelSessionRequest";

interface SessionCancelDialogProps {
  sessionId: string;
}

const SessionCancelDialog = ({ sessionId }: SessionCancelDialogProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: cancelSession, isPending } = useCancelSessionRequest();

  const handleSubmit = () => {
    cancelSession(sessionId, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 size={16} className="mr-1" />
          <span className="">Cancel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle className="">Are you sure you want to cancel the session?</DialogTitle>
          <DialogDescription className="">
            This will delete your session request and you will need to request again to get a
            session from this user
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="sm:flex-none sm:w-auto">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="sm:flex-none sm:w-20">
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionCancelDialog;
