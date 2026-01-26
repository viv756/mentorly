import { useJoinSession } from "@/hooks/api/session/use-joinSession";
import { useAuthStore } from "@/store/store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import  VideoRoom  from "./_components/video-room";

const VideoCall = () => {
  const { sessionId } = useParams();
  // const { user } = useAuthStore((s) => s.user);

  const { mutate, data, isLoading } = useJoinSession();

  useEffect(() => {
    if (!sessionId) return;
    mutate(sessionId);
  }, [sessionId, mutate]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const agoraData = data.agoraData;

  return (
    <div>
      <VideoRoom
        appId={agoraData.appId}
        token={agoraData.token}
        channelName={agoraData.channelName}
        uid={agoraData.uid}
      />
    </div>
  );
};

export default VideoCall;
