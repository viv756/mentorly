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
import { Trash2 } from "lucide-react";

interface SessionCancelDialogProps {
  sessionId: string;
}

const SessionCancelDialog = ({ sessionId }: SessionCancelDialogProps) => {
  const { mutate: cancelSession, isPending } = useCancelSessionRequest();

  const handleSubmit = () => {
    cancelSession(sessionId);
  };

  return (
    <div>
      <Dialog>
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
            <DialogClose>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" className="w-25" onClick={handleSubmit}>
              {isPending ? <Spinner /> : "  Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionCancelDialog;
