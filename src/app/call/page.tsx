"use client";
import { useState, useEffect } from "react";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  AgoraRTCProvider,
} from "agora-rtc-react";
import { createClient } from "agora-rtc-sdk-ng";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import AgoraUIKit from "agora-react-uikit";

const client = createClient({ mode: "rtc", codec: "vp8" });

export default function Home() {
  return (
    <AgoraRTCProvider client={client}>
      <Basics />
    </AgoraRTCProvider>
  );
}

// const Basics = () => {
//   const [calling, setCalling] = useState(false);
//   const isConnected = useIsConnected();
//   const [appId, setAppId] = useState("6cb356d97c964a31b548687d76bbb2b0");
//   const [channel, setChannel] = useState("testChanel");
//   const [token, setToken] = useState(
//     "007eJxTYLiatsvUQbD44LLJq+3kd/Z+i7jkJ9d25Hm47N1d7kdMp6sqMJglJxmbmqVYmidbmpkkGhsmmZpYmFmYp5ibJSUlGSUZaJaqpDcEMjI4cN5mZWSAQBCfi6EktbjEOSMxLzWHgQEABuIg5Q=="
//   );

//   // Use Agora join hook with error handling
//   const { error } = useJoin(
//     { appid: appId, channel, token: token || null },
//     calling
//   );

//   useEffect(() => {
//     if (error) {
//       console.error("Error joining channel:", error);
//     }
//   }, [error]);

//   const [micOn, setMic] = useState(true);
//   const [cameraOn, setCamera] = useState(true);
//   const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
//   const { localCameraTrack, error: cameraError } =
//     useLocalCameraTrack(cameraOn);

//   usePublish([localMicrophoneTrack, localCameraTrack]);

//   const remoteUsers = useRemoteUsers();

//   useEffect(() => {
//     if (localCameraTrack) {
//       console.log("Playing camera track");
//       localCameraTrack.play("camera-container");
//     } else {
//       console.log("Local camera track is not available.");
//     }
//   }, [localCameraTrack]);

//   useEffect(() => {
//     if (cameraError) {
//       console.error("Camera error:", cameraError);
//     }
//   }, [cameraError]);
//   useEffect(() => {
//     remoteUsers.forEach((user) => {
//       // Video track playback
//       if (user.videoTrack) {
//         user.videoTrack.play(`video-${user.uid}`);
//       }

//       // Audio track playback
//       if (user.audioTrack) {
//         user.audioTrack.play();
//       }
//     });
//   }, [remoteUsers]);

//   const toggleCamera = () => {
//     setCamera((prev) => {
//       if (prev) {
//         localCameraTrack?.stop(); // Stop the camera when toggling off
//         console.log("Camera turned off");
//       } else {
//         localCameraTrack?.play("camera-container"); // Play the camera when toggling on
//         console.log("Camera turned on");
//       }
//       return !prev;
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       {isConnected ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           <div className="">
//             {localCameraTrack ? (
//               <div
//                 id="camera-container"
//                 className="w-full h-full"
//                 style={{ height: "400px" }}
//               >
//                 <LocalUser
//                   audioTrack={localMicrophoneTrack}
//                   videoTrack={localCameraTrack}
//                   cameraOn={cameraOn}
//                   micOn={micOn}
//                 >
//                   <span className="text-sm font-semibold text-center text-black">
//                     You
//                   </span>
//                 </LocalUser>
//               </div>
//             ) : (
//               <div className="text-center text-gray-500">Loading camera...</div>
//             )}
//           </div>

//           {/* Remote Users */}
//           {remoteUsers.map((user) => (
//             <div
//               className="user bg-white p-4 rounded-lg shadow-md"
//               key={user.uid}
//             >
//               <div
//                 id={`video-${user.uid}`}
//                 className="remote-video w-full h-48 bg-gray-200"
//               ></div>
//               <span className="text-sm font-semibold text-center">
//                 User ID: {user.uid}
//               </span>
//               {/* Handle the audio track for the user */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className=" w-[500px] h-[400px] bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
//           <img
//             alt="agora-logo"
//             className="w-24 mb-4"
//             src="/myImages/logo-purple.svg"
//           />
//           <div className="grid grid-cols-1 w-full">
//             <InputField
//               label="APP ID:"
//               onChange={(e) => setAppId(e.target.value)}
//               placeholder="Your app ID"
//               value={appId}
//               className="input mb-2 w-full"
//             />
//             <InputField
//               label="Channel Name:"
//               onChange={(e) => setChannel(e.target.value)}
//               placeholder="Channel Name"
//               value={channel}
//               className="input mb-2 w-full"
//             />
//             <InputField
//               label="Token:"
//               onChange={(e) => setToken(e.target.value)}
//               placeholder="Token"
//               value={token}
//               className="input mb-4 w-full"
//             />
//             <button
//               className={`btn ${
//                 !appId || !channel ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={!appId || !channel}
//               onClick={() => {
//                 setCalling(true);
//                 console.log("Attempting to join with:", {
//                   appId,
//                   channel,
//                   token,
//                 });
//               }}
//             >
//               Join Channel
//             </button>
//           </div>
//         </div>
//       )}

//       {isConnected && (
//         <div className="flex justify-center gap-4 mt-4">
//           {/* Microphone Button */}
//           <Button
//             className={`btn p-2 w-[100px] h-[50px] rounded-full ${
//               micOn ? "bg-green-500" : "bg-gray-500"
//             } hover:bg-green-400`}
//             onClick={() => setMic((prev) => !prev)}
//           >
//             <i
//               className={`i-microphone text-white ${
//                 !micOn ? "opacity-50" : ""
//               }`}
//             />
//             Mic
//           </Button>

//           {/* Camera Button */}
//           <Button
//             className={`btn p-2 w-[100px] h-[50px] rounded-full ${
//               cameraOn ? "bg-blue-500" : "bg-gray-500"
//             } hover:bg-blue-400`}
//             onClick={toggleCamera}
//           >
//             <i className={` text-white ${!cameraOn ? "opacity-50" : ""}`} />
//             Camera
//           </Button>

//           {/* Hangup Button */}
//           <Button
//             className={` p-2 w-[100px] h-[50px] rounded-full ${
//               calling ? "bg-red-500" : "bg-gray-500"
//             } hover:bg-red-400`}
//             onClick={() => setCalling(false)}
//           >
//             <i className="i-phone-hangup text-black" />
//             Hang
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

const Basics = () => {
  // Other states and hooks...
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState("60c4bc38039e4e539319a4ce5a2ad144");
  const [channel, setChannel] = useState("testinput");
  const [token, setToken] = useState(
    "007eJxTYFgqJbhrR95OBmWpK/UZM73Xi6+dMbF9g0xExMRnARwaemsUGMwMkk2Sko0tDIwtU01STY0tjQ0tE02SU00TjRJTDE1M3rtppDcEMjIEHDnCwAiFID4nQ0lqcUlmXkFpCQMDAEbSH7s="
  );

  // Use Agora join hook with error handling
  const { error } = useJoin(
    { appid: appId, channel, token: token || null },
    calling
  );

  useEffect(() => {
    if (error) {
      console.error("Error joining channel:", error);
    }
  }, [error]);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack, error: cameraError } =
    useLocalCameraTrack(cameraOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  useEffect(() => {
    // Start local camera track when calling
    if (calling) {
      localCameraTrack?.play("camera-container");
    } else {
      localCameraTrack?.stop(); // Stop the camera when hanging up
    }
  }, [calling, localCameraTrack]);

  useEffect(() => {
    if (cameraError) {
      console.error("Camera error:", cameraError);
    }
  }, [cameraError]);
  useEffect(() => {
    remoteUsers.forEach((user) => {
      // Video track playback
      if (user.videoTrack) {
        user.videoTrack.play(`video-${user.uid}`);
      }

      // Audio track playback
      if (user.audioTrack) {
        user.audioTrack.play();
      }
    });
  }, [remoteUsers]);

  const toggleCamera = () => {
    setCamera((prev) => {
      if (prev) {
        localCameraTrack?.stop(); // Stop the camera when toggling off
        console.log("Camera turned off");
      } else {
        localCameraTrack?.play("camera-container"); // Play the camera when toggling on
        console.log("Camera turned on");
      }
      return !prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {isConnected ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="">
            {localCameraTrack ? (
              <div
                id="camera-container"
                className="w-full h-full"
                style={{ height: "400px" }}
              >
                {/* Make sure LocalUser is properly using localCameraTrack */}
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  videoTrack={localCameraTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                >
                  <span className="text-sm font-semibold text-center text-black">
                    You
                  </span>
                </LocalUser>
              </div>
            ) : (
              <div className="text-center text-gray-500">Loading camera...</div>
            )}
          </div>

          {/* Remote Users */}
          {remoteUsers.map((user) => (
            <div
              className="user bg-white p-4 rounded-lg shadow-md"
              key={user.uid}
            >
              <div
                id={`video-${user.uid}`}
                className="remote-video w-full h-48 bg-gray-200"
              ></div>
              <span className="text-sm font-semibold text-center">
                User ID: {user.uid}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-[500px] h-[400px] bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          //{" "}
          <img
            alt="agora-logo"
            className="w-24 mb-4"
            src="/myImages/logo-purple.svg"
          />
          <div className="grid grid-cols-1 w-full">
            <InputField
              label="APP ID:"
              onChange={(e) => setAppId(e.target.value)}
              placeholder="Your app ID"
              value={appId}
              className="input mb-2 w-full"
            />
            <InputField
              label="Channel Name:"
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Channel Name"
              value={channel}
              className="input mb-2 w-full"
            />
            <InputField
              label="Token:"
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token"
              value={token}
              className="input mb-4 w-full"
            />
            <button
              className={`btn ${
                !appId || !channel ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!appId || !channel}
              onClick={() => {
                setCalling(true);
                console.log("Attempting to join with:", {
                  appId,
                  channel,
                  token,
                });
              }}
            >
              Join Channel
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {isConnected && (
        <div className="flex justify-center gap-4 mt-4">
          {/* Microphone Button */}
          <Button
            className={`btn p-2 w-[100px] h-[50px] rounded-full ${
              micOn ? "bg-green-500" : "bg-gray-500"
            } hover:bg-green-400`}
            onClick={() => setMic((prev) => !prev)}
          >
            <i
              className={`i-microphone text-white ${
                !micOn ? "opacity-50" : ""
              }`}
            />
            Mic
          </Button>

          {/* Camera Button */}
          <Button
            className={`btn p-2 w-[100px] h-[50px] rounded-full ${
              cameraOn ? "bg-blue-500" : "bg-gray-500"
            } hover:bg-blue-400`}
            onClick={toggleCamera}
          >
            <i className={`text-white ${!cameraOn ? "opacity-50" : ""}`} />
            Camera
          </Button>

          {/* Hangup Button */}
          <Button
            className={`p-2 w-[100px] h-[50px] rounded-full ${
              calling ? "bg-red-500" : "bg-gray-500"
            } hover:bg-red-400`}
            onClick={() => {
              setCalling(false);
              setCamera(false); // Optionally stop the camera when hanging up
            }}
          >
            <i className="i-phone-hangup text-black" />
            Hang
          </Button>
        </div>
      )}
    </div>
  );
};
