import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Rating, RatingButton } from "@/components/ui/rating";
import { useCreateRating } from "@/hooks/api/rating/use-createRating";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { Spinner } from "@/components/ui/spinner";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  comment: z
    .string()
    .min(1, "Please provide a comment")
    .max(300, "Comment should be at most 300 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

type FeedbackDialogProps = {
  open: boolean;
  onClose: () => void;
};

const FeedbackDialog = ({ open, onClose }: FeedbackDialogProps) => {
  const { mutate: createRating, isPending } = useCreateRating();
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const user = useAuthStore((s) => s.user);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const handleSubmit = (data: FeedbackFormValues) => {
    const payLoad = {
      rating: data.rating,
      comment: data.comment,
    };

    if (!user || !sessionId) return;

    const fromUserId = user.userId;
    createRating({ sessionId, fromUserId, data: payLoad });

    form.reset();
    onClose();
    navigate("/overview");
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>Share Your Feedback</DialogTitle>
        <DialogDescription>
          How would you rate your experience? Your feedback helps us improve.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <Rating value={field.value} onValueChange={field.onChange}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <RatingButton key={index} className="text-yellow-400" />
                        ))}
                      </Rating>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="resize-none min-h-25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit" className="w-35">
                {isPending ? <Spinner /> : "Submit Feedback"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
