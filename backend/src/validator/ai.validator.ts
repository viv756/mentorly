import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Message content cannot be empty"),
});

export const ChatMessagesSchema = z
  .array(ChatMessageSchema)
  .min(1, "At least one message is required");

export type ChatMessageType = z.infer<typeof ChatMessageSchema>;
export type ChatMessagesType = z.infer<typeof ChatMessagesSchema>;
