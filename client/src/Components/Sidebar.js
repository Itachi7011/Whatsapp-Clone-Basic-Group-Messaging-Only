import MessageIcon from "@mui/icons-material/Message";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import MoreVertIcon from "@mui/icons-material/MoreVert";
const SidebarChat = () => {
  return (
    <>
      <div className="sidebar_chat">
        <Avatar />
        <div className="sidebar_chat_info">
          <h2>Room Name</h2>
          <p>This is last message</p>
        </div>
      </div>
    </>
  );
};
const Sidebar = () => {
  return (
    <>
      <div className="sidebar flex flex-col">
        <div className="sidebar_header">
          <div className="sidebar_header_left">
            <IconButton>
              <Avatar />
            </IconButton>
          </div>

          <div className="sidebar_header_right">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <MessageIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <br />
        <div className="sidebar_input">
          <IconButton>
            <SearchIcon />{" "}
          </IconButton>

          <input></input>
        </div>
        <div className="sidebar_btn_div">
          <button className="sidebar_btn">Add New Room</button>
        </div>
        <SidebarChat />
      </div>
    </>
  );
};
export default Sidebar;
