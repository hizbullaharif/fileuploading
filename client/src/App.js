import { useEffect, useState } from "react";
import "./App.css";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import { onMessageListener } from "./firebase";
import axios from "axios";
import { getMessaging, onMessage } from "firebase/messaging";
import Example from "./components/WindowAlert";
import Alert from "./components/Alert";

function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState();
  const messaging = getMessaging();

  const handleNotification = () => {
    console.log("testing frontend");
    const data = {
      email: "hizbullahkhn@gmail.com",
      password: "12345678",
    };
    var config = {
      method: "get",
      url: "http://[::1]:3000/hello",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("from backend" + response.data);
      })
      .catch(function (error) {
        console.log("hhhhh" + error);
      });
  };

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    setNotification({
      title: payload.notification.title,
      body: payload.notification.body,
      msgId: payload.messageId,
    });
    setShow(true);
  });

  useEffect(() => {
    Notification.requestPermission();

    function fetchToken() {
      getToken(messaging, {
        vapidKey:
          "BESmOoaM4gsi9AG8ea6yEVUKc5fXwjkxbbtSQblX-GWQADJKpjUY_cxw2Ayuh2Osb2xJ6q3mQ-ZyzFgBtFWaA5Q",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            return currentToken;
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    }
    fetchToken();
  }, []);

  return (
    <div className="App">
      <button onClick={handleNotification}>Send Notification</button>
      <h1>Push notifications</h1>
      {show && (
        <>
          <Example title={notification.title} />
          <Alert props={notification.title} toastId={notification.msgId} />
        </>
      )}
    </div>
  );
}

export default App;
