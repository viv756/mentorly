import type { Mentor } from "@/store/use-message-store";

export type ChatMessage =
  | {
      messageId: string;
      role: "user";
      content: string;
      type?: undefined;
    }
  | {
      messageId: string;
      role: "assistant";
      type: "followup";
      content: string;
    }
  | {
      messageId: string;
      role: "assistant";
      type: "searchResults";
      content: Mentor[];
    }
  | {
      role: "user";
      content: string
    };
