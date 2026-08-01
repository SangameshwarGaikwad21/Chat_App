import React from 'react'
import SidebarWrapper from '../sidebar/sidebarWrapper'
import ChatMessage from './chatMessage'

const Chat = () => {
  return (
    <div>
        <SidebarWrapper />    
       <ChatMessage />
    </div>
  )
}

export default Chat