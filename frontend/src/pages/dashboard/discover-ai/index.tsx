import { useEffect, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai/conversation";
import { Message, MessageContent } from "@/components/ai/message";
import { Orb } from "@/components/ai/orb";
import { Response } from "@/components/ai/response";
import AI_Input_Search from "@/pages/dashboard/discover-ai/_components/ai-input-search";
import { useChatStore } from "@/store/use-message-store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StreamingResponse } from "./_components/streaming-response";
import { useAiAssistant } from "@/hooks/api/ai/use-aiAssistent";

export type MessageVariant = "user" | "assistant";

export interface Message {
  id: string;
  from: MessageVariant;
  content: string;
  name: string;
  avatarUrl: string;
}

const DiscoverAi = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  // const { isPending } = useAiAssistant();
  const messages = useChatStore((s) => s.messages);
  const clearMessages = useChatStore((s) => s.clearMessages);

  useEffect(() => {
    // cleanup runs when component unmounts
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Main content area */}
      <div className="flex-1 flex justify-center w-full">
        <div className="max-w-4xl w-full">
          <Conversation>
            <ConversationContent>
              {messages.length === 0 ? (
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
                              <div className="flex sm:flex-row flex-col gap-5 sm:gap-2 items-center">
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
                    // assistant message
                    // return (
                    //   <Message key={message.messageId} from="assistant">
                    //     <MessageContent>
                    //       {isLastMessage ? (
                    //         <StreamingResponse text={message.content} />
                    //       ) : (
                    //         <Response>{message.content}</Response>
                    //       )}
                    //     </MessageContent>
                    //   </Message>
                    // );
                  })}
                </>
              )}
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
