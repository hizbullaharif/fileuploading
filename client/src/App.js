import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const socket = io.connect("http://[::1]:3000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  console.log(socket.id);
  const sendMessage = async (e) => {
    e.preventDefault();
    const msgData = {
      msg: message,
      socketId: socket.id,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("sendMsg", msgData);
  };
  useEffect(() => {
    socket.on("recievedMsg", (data) => {
      console.log("Recieved msg", data);
      setChat((list) => [...list, data]);
      console.log(chat);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat app</h1>
        <ScrollToBottom className="chat">
          {chat.map((item, key) => (
            <li id={socket.id === item.socketId ? "you" : "other"} key={key}>
              {item.msg}
              <br />
              <span
                className={socket.id === item.socketId ? "myTime" : "otherTime"}
              >
                {item.time}
              </span>
            </li>
          ))}
        </ScrollToBottom>

        <form onSubmit={(e) => sendMessage(e)}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            name="text"
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
