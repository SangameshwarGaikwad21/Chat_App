"use client";

import { useEffect, useState } from "react";
import SidebarWrapper from "../sidebar/sidebarWrapper";
import ChatWindow from "./ChatWindow";

export default function Chat() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChat, setSelectedChat] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // Desktop
  if (!isMobile) {
    return (
      <div className="flex h-screen bg-[#0B1120]">
        <SidebarWrapper />

        <div className="flex-1 overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="h-screen bg-[#0B1120]">
      {!selectedChat ? (
        <SidebarWrapper
          closeSidebar={() => setSelectedChat(true)}
        />
      ) : (
        <ChatWindow
          openSidebar={() => setSelectedChat(false)}
        />
      )}
    </div>
  );
}
