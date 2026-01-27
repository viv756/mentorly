import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingMeetings from "./_components/upcoming-meetings";
import RequestedMeetings from "./_components/requestedMeetings";
import { useGetUpcomingAndRequestedSessions } from "@/hooks/api/session/use-getUpcomingAndRequestedSessions";

const Meetings = () => {
  const { data, isLoading } = useGetUpcomingAndRequestedSessions();

  if (isLoading || !data) {
    return <div>Loading</div>;
  }
  
  const upcoming = data.sessions[0].upcoming;
  const requested = data.sessions[0].requested;

  return (
    <>
      <h1 className="text-4xl font-semibold py-10">All Meetings </h1>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="">
          <TabsTrigger value="upcoming" className="">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="requested" className="">
            Requested
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <UpcomingMeetings upcoming={upcoming} />
        </TabsContent>
        <TabsContent value="requested">
          <RequestedMeetings requested={requested} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Meetings;
