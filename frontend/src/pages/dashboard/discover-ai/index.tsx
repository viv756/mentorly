import { Conversation, ConversationContent } from "@/components/ai/conversation";
import { Message, MessageAvatar, MessageContent } from "@/components/ai/message";
import { Response } from "@/components/ai/response";
import AI_Input_Search from "@/pages/dashboard/discover-ai/_components/ai-input-search";

export type MessageVariant = "user" | "assistant";

export interface Message {
  id: string;
  from: MessageVariant;
  content: string;
  name: string;
  avatarUrl: string;
}

const DiscoverAi = () => {
  const messages: Message[] = [
    {
      id: "1",
      from: "user",
      content: "Hi, I'm looking for a React mentor",
      name: "You",
      avatarUrl: "/avatars/user.png",
    },
    {
      id: "2",
      from: "assistant",
      content: "Sure! I can help you find the right mentor. What level are you?",
      name: "Mentor AI",
      avatarUrl: "/avatars/assistant.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Main content area */}
      <div className="flex-1 flex justify-center w-full">
        <div className="max-w-4xl w-full">
          <Conversation>
            <ConversationContent>
              {messages.map((message) => (
                <Message key={message.id} from={message.from}>
                  <MessageAvatar src={message.avatarUrl} name={message.name} />
                  <MessageContent>
                    <Response>{message.content}</Response>
                  </MessageContent>
                </Message>
              ))}
            </ConversationContent>
          </Conversation>
        </div>
      </div>

      {/* Input fixed at bottom */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t">
        <AI_Input_Search />
      </div>
    </div>
  );
};

export default DiscoverAi;