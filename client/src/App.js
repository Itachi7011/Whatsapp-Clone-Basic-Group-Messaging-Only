import "./App.css";
import Sidebar from "./Components/Sidebar";
import MainChat from "./Components/MainChat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js"
import Axios from "./Components/Axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    Axios.get("/messages/sync").then((response)=>{
      console.log(response.data);
      setMessages(response.data)
    })
  },[])

  useEffect(()=>{
    const pusher = new Pusher('03ecad9c27841e971b65', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

  console.log(messages);

  return (
    <div className="App grid place-items-center h-screen">
      <div className="app-body flex h-5/6 w-5/6">
      <Sidebar/>
      <MainChat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
