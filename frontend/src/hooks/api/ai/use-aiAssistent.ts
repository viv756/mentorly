import { useMutation } from "@tanstack/react-query";
import { aiAssistantAPiFn } from "@/features/ai/api/aiAssistant";
import type { ChatMessage } from "@/features/ai/types";
import { useChatStore } from "@/store/use-message-store";
import { filterUserMessages } from "@/lib/helper";

export const useAiAssistant = () => {
  const addMessage = useChatStore((s) => s.addMessage);

  return useMutation({
    mutationFn: (messages: ChatMessage[]) => {
      const userMessages  = filterUserMessages(messages);
      return aiAssistantAPiFn(userMessages);
    },

    onSuccess: (data) => {
      const aiResponse = data.response;
      console.log("API Response:", aiResponse); // Debug log

      if (aiResponse.type === "followup") {
        addMessage({
          role: "assistant",
          type: "followup",
          content: aiResponse.content,
        });
      }

      if (aiResponse.type === "searchResults") {
        console.log("Mentors data:", aiResponse.mentors); // Debug log

        // Check if mentors is an array and has the expected structure
        if (!Array.isArray(aiResponse.mentors)) {
          console.error("Mentors is not an array:", aiResponse.mentors);
          return;
        }

        addMessage({
          role: "assistant",
          type: "searchResults",
          content: aiResponse.mentors, // Now content is the mentors array
        });
      }
    },
    onError: (error) => {
      console.error("AI Assistant Error:", error);
    },
  });
};
