import { useState } from "react";
import Axios from "./Axios";

import MessageIcon from "@mui/icons-material/Message";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoodIcon from "@mui/icons-material/Mood";

const MainChat = ({ messages }) => {
  let name, value;
  const [message, setMessages] = useState({
    message: "",
    name: "You",
    timeStamp: new Date().toISOString(),
    recieved: false,
  });

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setMessages({
      ...message,
      [name]: value,
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    Axios.post("messages/new", {
      message: message.message,
      name: "You",
      timeStamp: new Date().toISOString(),
      recieved: false,
    });
    setMessages("");
  };
  return (
    <>
      <div className="mainChat flex flex-col">
        <div className="mainChat_header">
          <div className="mainChat_header_left">
            <Avatar />
            <div>
              <h2>Room Name</h2>
            </div>
          </div>

          <div className="mainChat_header_right">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <MessageIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat_body">
          <h1 id="chat_heading">Chat</h1>
          <div>
            {messages.map((msg) => {
              return (
                <p
                  className={`chat_message  ${
                    !msg.recieved && "chat_reciever"
                  }`}
                >
                  <span className="chat_name">{msg.name}</span>
                  {msg.message}
                  <span className="chat_timeStamp">{msg.timeStamp}</span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="chat_footer">
          <IconButton>
            <MoodIcon />
          </IconButton>
          <form method="post" action="/messages/new">
            <input
              type="text"
              name="message"
              placeholder="Type a message"
              onChange={handleInput}
            />
            <input
              type="hidden"
              name="timeStamp"
              value={Date.now()}
              placeholder=""
            />
            <button type="submit" onClick={sendMessage}>
              Send Message
            </button>
          </form>

          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default MainChat;
