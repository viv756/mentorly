import React, { useEffect, useRef, useState } from "react";
import AgoraRTC, {
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor } from "lucide-react";

interface Props {
  appId: string;
  token: string;
  channelName: string;
  uid: string | number;
}

export default function VideoRoom({ appId, token, channelName, uid }: Props) {
  console.log(channelName);
  
  const localVideoRef = useRef<HTMLDivElement>(null);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const audioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const videoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const screenTrackRef = useRef<any | null>(null);

  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    const init = async () => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      AgoraRTC.setLogLevel(4); 
      clientRef.current = client;

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          setRemoteUsers((prev) => {
            // Avoid duplicates
            if (prev.find((u) => u.uid === user.uid)) {
              return prev;
            }
            return [...prev, user];
          });
          
          // Use setTimeout to ensure the DOM element exists
          setTimeout(() => {
            const element = document.getElementById(`remote-${user.uid}`);
            if (element) {
              user.videoTrack?.play(element);
            }
          }, 100);
        }

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        }
      });

      client.on("user-left", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      await client.join(appId, channelName, token, uid);

      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();

      audioTrackRef.current = audioTrack;
      videoTrackRef.current = videoTrack;

      if (localVideoRef.current) {
        videoTrack.play(localVideoRef.current);
      }
      await client.publish([audioTrack, videoTrack]);
    };

    init();

    return () => {
      audioTrackRef.current?.close();
      videoTrackRef.current?.close();
      screenTrackRef.current?.close();
      clientRef.current?.leave();
    };
  }, [appId, channelName, token, uid]);

  const toggleMute = async () => {
    if (!audioTrackRef.current) return;
    // Fix: setEnabled should receive the opposite of current state
    await audioTrackRef.current.setEnabled(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleVideo = async () => {
    if (!videoTrackRef.current) return;
    // Fix: setEnabled should receive the opposite of current state
    await videoTrackRef.current.setEnabled(isVideoOff);
    setIsVideoOff(!isVideoOff);
  };

  const toggleScreenShare = async () => {
    const client = clientRef.current;
    if (!client || !videoTrackRef.current) return;

    try {
      if (!isScreenSharing) {
      const screenTrack = await AgoraRTC.createScreenVideoTrack({}, "disable");
        screenTrackRef.current = screenTrack;
        
        await client.unpublish(videoTrackRef.current);
        await client.publish(screenTrack);
        setIsScreenSharing(true);
      } else {
        if (screenTrackRef.current) {
          await client.unpublish(screenTrackRef.current);
          screenTrackRef.current.close();
        }
        
        await client.publish(videoTrackRef.current);
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Screen share error:", error);
      setIsScreenSharing(false);
    }
  };

  const endCall = async () => {
    audioTrackRef.current?.close();
    videoTrackRef.current?.close();
    screenTrackRef.current?.close();
    await clientRef.current?.leave();
    // Optional: navigate away or show end call screen
  };

  console.log(remoteUsers,"remoteusers");
  

  return (

       <div className="h-screen bg-gray-900 text-white flex flex-col relative">
      {/* Main Video Area */}
      <div className="flex-1 relative">
        {remoteUsers.length === 0 ? (
          // No remote users - show placeholder
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-16 h-16 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg">Waiting for others to join...</p>
            </div>
          </div>
        ) : remoteUsers.length === 1 ? (
          // Single remote user - full screen
          <div className="w-full h-full relative bg-black">
            <div id={`remote-${remoteUsers[0].uid}`} className="w-full h-full" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-3 py-2 rounded-lg text-sm">
              User {remoteUsers[0].uid}
            </div>
          </div>
        ) : (
          // Multiple remote users - grid layout
          <div
            className={`w-full h-full grid gap-2 p-2 ${
              remoteUsers.length === 2
                ? "grid-cols-2"
                : remoteUsers.length === 3
                ? "grid-cols-2"
                : remoteUsers.length === 4
                ? "grid-cols-2 grid-rows-2"
                : "grid-cols-3"
            }`}
          >
            {remoteUsers.map((user) => (
              <div
                key={user.uid}
                className="relative bg-black rounded-lg overflow-hidden"
              >
                <div id={`remote-${user.uid}`} className="w-full h-full" />
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded-lg text-sm">
                  User {user.uid}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Local Video - Bottom Right Corner (Google Meet style) */}
        <div className="absolute bottom-8  right-6 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 bg-black z-10">
          <div ref={localVideoRef} className="w-full h-full" />
          
          {/* Local video overlay info */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs flex items-center gap-1">
            {isMuted && <MicOff className="w-3 h-3" />}
            <span>You</span>
          </div>

          {isScreenSharing && (
            <div className="absolute top-2 left-2 bg-green-600 px-2 py-1 rounded text-xs flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              <span>Sharing</span>
            </div>
          )}

          {isVideoOff && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">Y</span>
                </div>
                <p className="text-xs text-gray-400">Camera off</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex justify-center items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full transition ${
            isMuted
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full transition ${
            isVideoOff
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={isVideoOff ? "Turn on camera" : "Turn off camera"}
        >
          {isVideoOff ? (
            <VideoOff className="w-5 h-5" />
          ) : (
            <Video className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-3 rounded-full transition ${
            isScreenSharing
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={isScreenSharing ? "Stop sharing" : "Share screen"}
        >
          <Monitor className="w-5 h-5" />
        </button>

        <button
          onClick={endCall}
          className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition ml-2"
          title="End call"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}