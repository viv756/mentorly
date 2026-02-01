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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 size={16} className="mr-1" />
            Cancel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to cancel the session?</DialogTitle>
            <DialogDescription>
              This will delete your session request and you will need to request again to get a
              session from this user
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" className="w-20" onClick={handleSubmit} disabled={isPending}>
              {isPending ? <Spinner /> : "  Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionCancelDialog;
