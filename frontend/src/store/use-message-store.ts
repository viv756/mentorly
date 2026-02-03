import { create } from "zustand";

/* ======================
   Types
====================== */

export type Mentor = {
  _id: string;
  userId: string;
  skillName: string;
  skillLevel: string;
  experienceYears: number;
  user: {
    name: string;
    lastActiveAt: Date;
  };
  profile: {
    avatar?: string;
    bio?: string;
    aboutMe?: string;
    rating?: { average?: number; count?: number };
  };
  reason: string;
};

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
    };

/* ======================
   Store Interface
====================== */

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "messageId">) => void;
  clearMessages: () => void;
}

/* ======================
   Zustand Store - FIXED VERSION
====================== */

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  addMessage: (message) => {
    // Create messageId first
    const messageId = crypto.randomUUID();

    // Use type guards to determine the correct message type
    if (message.role === "user") {
      const newMessage: ChatMessage = {
        messageId,
        role: "user",
        content: message.content as string, // Explicitly cast to string
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
      return;
    }

    if (message.role === "assistant" && message.type === "followup") {
      const newMessage: ChatMessage = {
        messageId,
        role: "assistant",
        type: "followup",
        content: message.content as string, // Explicitly cast to string
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
      return;
    }

    if (message.role === "assistant" && message.type === "searchResults") {
      const newMessage: ChatMessage = {
        messageId,
        role: "assistant",
        type: "searchResults",
        content: message.content as Mentor[], // Explicitly cast to Mentor[]
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
      return;
    }

    throw new Error("Invalid message type");
  },

  clearMessages: () => set({ messages: [] }),
}));
