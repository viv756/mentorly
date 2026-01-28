import { parseAsBoolean, useQueryState } from "nuqs";

const UseFeedbackDialog = () => {
  const [isOpen, setOpen] = useQueryState("user-feedback", parseAsBoolean.withDefault(false));

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default UseFeedbackDialog;
