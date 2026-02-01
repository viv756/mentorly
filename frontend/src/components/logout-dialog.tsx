import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useLogout } from "@/hooks/api/auth/use-logout";
import { useCallback } from "react";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";

interface LogoutDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutDialog = ({ isOpen, setIsOpen }: LogoutDialogProps) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = useCallback(() => {
    if (isPending) return;
    logout();
    setIsOpen(false)
  }, [isPending, logout]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            This will end your current session and you will need to log in again to access your
            account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} type="button" onClick={handleLogout}>
            {isPending && <Spinner />}
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
