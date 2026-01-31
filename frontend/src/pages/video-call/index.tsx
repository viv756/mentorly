import { useJoinSession } from "@/hooks/api/session/use-joinSession";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoRoom from "./_components/video-room";
import Loader from "@/components/ui/loader";

const VideoCall = () => {
  const { sessionId } = useParams();
  // const { user } = useAuthStore((s) => s.user);

  const { mutate, data, isPending } = useJoinSession();

  useEffect(() => {
    if (!sessionId) return;
    mutate(sessionId);
  }, [sessionId, mutate]);

  if (isPending || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader title="Configuring your dashboard" />
      </div>
    );
  }

  const agoraData = data.agoraData;

  return (
    <div>
      <VideoRoom
        appId={agoraData.appId}
        token={agoraData.token}
        channelName={agoraData.channelName}
        uid={agoraData.uid}
        learnerId={agoraData.learnerId}
      />
    </div>
  );
};

export default VideoCall;
