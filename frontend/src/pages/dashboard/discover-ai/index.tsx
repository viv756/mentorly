import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai/conversation";
import { Message, MessageContent } from "@/components/ai/message";
import { Orb } from "@/components/ai/orb";
import { Response } from "@/components/ai/response";
import AI_Input_Search from "@/pages/dashboard/discover-ai/_components/ai-input-search";
import { useChatStore } from "@/store/use-message-store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StreamingResponse } from "./_components/streaming-response";
import { ShimmeringText } from "@/components/ai/shimmering-text";
import { useAiAssistant } from "@/hooks/api/ai/use-aiAssistant";

export type MessageVariant = "user" | "assistant";

export interface Message {
  id: string;
  from: MessageVariant;
  content: string;
  name: string;
  avatarUrl: string;
}

const phrases = [
  "Agent is thinking...",
  "Processing your request...",
  "Analyzing the data...",
  "Generating response...",
  "Almost there...",
];

const DiscoverAi = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mutate: sendMessage, isPending } = useAiAssistant();
  const messages = useChatStore((s) => s.messages);
  const clearMessages = useChatStore((s) => s.clearMessages);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // cleanup runs when component unmounts
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  return (
    <div className="h-full flex flex-col w-full">
      {/* Main content area */}
      <div className="flex-1 min-h-0 flex justify-center w-full">
        <div className="max-w-4xl w-full">
          <Conversation className="h-full">
            <ConversationContent>
              {messages.length === 0 && !isPending ? (
                <ConversationEmptyState
                  icon={<Orb className="size-12" />}
                  title="Start a conversation"
                  description="Ai will help you to find best mentors for you"
                />
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;

                    if (message.role === "user") {
                      return (
                        <Message key={message.messageId} from="user">
                          <MessageContent>
                            <Response>{message.content}</Response>
                          </MessageContent>
                        </Message>
                      );
                    }

                    // FOLLOW-UP (STREAM ONLY LATEST)
                    if (message.type === "followup") {
                      return (
                        <Message key={message.messageId} from="assistant">
                          <MessageContent>
                            {isLastMessage ? (
                              <StreamingResponse
                                text={message.content}
                                onStreamingChange={setIsStreaming}
                              />
                            ) : (
                              <Response>{message.content}</Response>
                            )}
                          </MessageContent>
                          <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                            <Orb
                              className="h-full w-full"
                              agentState={isStreaming ? "talking" : null}
                            />
                          </div>
                        </Message>
                      );
                    }

                    if (message.type === "searchResults") {
                      return (
                        <Message key={message.messageId} from="assistant" className=" ">
                          <MessageContent className="flex flex-col gap-11 ">
                            {message.content.map((user) => (
                              <div
                                key={user.userId}
                                className="flex sm:flex-row flex-col gap-5 sm:gap-2 items-center">
                                <Card className="w-full sm:max-w-sm min-h-80">
                                  <CardContent className="">
                                    <div className="flex items-start gap-4 mb-4">
                                      <Avatar className="w-20 h-20 rounded-md">
                                        <AvatarImage
                                          src={`${user.profile.avatar}`}
                                          alt="profile"
                                          className="object-cover"
                                        />
                                        <AvatarFallback>TB</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <h3 className="text-xl font-semibold">{user.user.name}</h3>
                                        {user?.profile?.rating?.average && (
                                          <Badge className="bg-green-500 mt-1">
                                            {Math.round(user.profile.rating.average * 10) / 10} ★
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm mt-2 line-clamp-4">{user.profile.bio}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      <Badge variant="secondary" className="">
                                        {user.skillName}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="mt-auto">
                                    <Link to={`/user/${user.userId}`}>
                                      <Button className="">Book Now</Button>
                                    </Link>
                                  </CardFooter>
                                </Card>
                                <p className="flex-1 wrap-break-word">{user.reason}</p>
                              </div>
                            ))}
                          </MessageContent>
                          <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                            <Orb className="h-full w-full" agentState={"talking"} />
                          </div>
                        </Message>
                      );
                    }
                  })}

                  {/* Show loading shimmer when pending */}
                </>
              )}
              {isPending && (
                <Message from="assistant">
                  <MessageContent>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}>
                        <ShimmeringText text={phrases[currentIndex]} />
                      </motion.div>
                    </AnimatePresence>
                  </MessageContent>
                  <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                    <Orb className="h-full w-full" agentState="thinking" />
                  </div>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </div>

      {/* Input fixed at bottom */}
      <div className="shrink-0 bg-background/80 backdrop-blur-sm border-t">
        <AI_Input_Search onSend={sendMessage} />
      </div>
    </div>
  );
};

export default DiscoverAi;
