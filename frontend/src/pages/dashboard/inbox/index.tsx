import { Send } from "lucide-react";
import { useGetSessionRequest } from "@/hooks/api/session/use-getSessionRequest";
import SessionRequestCard, { SessionRequestSkelton } from "./_components/session-requestCard";
import { CardContent } from "@/components/ui/card";

const Inbox = () => {
  const { data, isLoading } = useGetSessionRequest();

  if (isLoading || !data) {
    return (
      <>
        <h1 className="text-4xl py-10  font-semibold">Session Requests</h1>
        <div className="grid sm:grid-cols-2  gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SessionRequestSkelton key={i} />
          ))}
        </div>
      </>
    );
  }

  const sessionRequests = data.sessionRequests;

  return (
    <>
      <h1 className="text-4xl py-10  font-semibold">Session Requests</h1>
      <div>
        {sessionRequests.length === 0 ? (
          <div className="flex justify-center items-center h-100 w-full">
            <CardContent className="p-12 text-center">
              <Send className="mx-auto text-muted-foreground mb-4" size={64} />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No requests yet</h3>
              <p className="text-muted-foreground mb-4">You don't have any session requests</p>
            </CardContent>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2  gap-2">
            {sessionRequests.map((session: any) => (
              <SessionRequestCard key={session._id} session={session} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Inbox;
