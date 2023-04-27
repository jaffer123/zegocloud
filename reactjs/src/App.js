import './App.css';
import React, { useState, useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from 'axios';


function App() {
  const myMeeting = useRef();
  const [token, setToken] = useState("");
  function getToken() {
    // axios.post("http://localhost:3001/token",{"roomId":"demo", "userName":"demo"})
    //     .then(response => response.data)
    //     .then((data) => {
    //       data = data.data;
    //       let token = data.token;
    //       setToken(token);
    //     });

    const appID = 1719115078;
    const serverSecret = '9c0948620f458fe8c5f3c29c33c5d798';
    const roomId = 'room12';
    const userName = 'jaffer';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      userName
    );
    setToken(kitToken);
}
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    if (token && myMeeting.current) {
      console.log(token)
      const zp = ZegoUIKitPrebuilt.create(token);
      zp.joinRoom({
        container: myMeeting.current,
      });
    }
  }, [token, myMeeting.current]);
  return (
    <div className="meet__container">
    <div ref={myMeeting} id="meet"></div>
  </div>
  );
}

export default App;
