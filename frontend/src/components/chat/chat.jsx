import SidebarWrapper from "../sidebar/sidebarWrapper";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  return (
    <div className="flex h-screen w-full bg-[#0B1120]">
      <SidebarWrapper />

      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;