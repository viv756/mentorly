import { useGetSessionRequest } from "@/hooks/api/session/use-getSessionRequest";
import SessionRequestCard from "./_components/session-requestCard";

const Inbox = () => {
  const { data, isLoading } = useGetSessionRequest();

  if (isLoading) {
    return <div>Loading</div>;
  }

  const sessionRequests = data.sessionRequests;

  return (
    <>
      <h1 className="text-4xl mt-5 font-semibold">Session Requests</h1>
      <div className="grid sm:grid-cols-2  gap-2 mt-10">
        {sessionRequests.map((session) => (
          <SessionRequestCard key={session._id} session={session} />
        ))}
      </div>
    </>
  );
};

export default Inbox;
