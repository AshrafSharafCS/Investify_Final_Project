import "./video.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import ReactPlayer from "react-player";

function Video() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
      await getMeetingAndToken(meetingId);
    };
    return (
      <div className="join-screen flex center">
         <div className="flex center gap-20 join-form">
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <button onClick={onClick}>Join</button>
        {" or "}
        <button onClick={onClick}>Create Meeting</button>
      </div>
      </div>
    );
  }

 
    function ParticipantView(props) {
        const micRef = useRef(null);
        const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
          useParticipant(props.participantId);
      
        const videoStream = useMemo(() => {
          if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
          }
        }, [webcamStream, webcamOn]);
      
        useEffect(() => {
          if (micRef.current) {
            if (micOn && micStream) {
              const mediaStream = new MediaStream();
              mediaStream.addTrack(micStream.track);
      
              micRef.current.srcObject = mediaStream;
              micRef.current
                .play()
                .catch((error) =>
                  console.error("videoElem.current.play() failed", error)
                );
            } else {
              micRef.current.srcObject = null;
            }
          }
        }, [micStream, micOn]);
      
        return (
          <div className="participant flex center column around">
            <p>
              Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
              {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
              <ReactPlayer
                
                playsinline 
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                
                url={videoStream}
                
                height={"300px"}
                width={"300px"}
                onError={(err) => {
                  console.log(err, "participant video error");
                }}
              />
            )}
          </div>
        );
      
  }

  function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div className="controls flex center gap-20">
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
    );
  }

  function MeetingView(props) {
    const [joined, setJoined] = useState(null);

    const { join, participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },

      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };

    return (
      <div className="meet-container flex padding-10 gap-20 column center">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "JOINED" ? (
          <div>
            <Controls />
            <div className="camera-view flex ">
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
          </div>
        ) : joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button className="join-button" onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Video;
