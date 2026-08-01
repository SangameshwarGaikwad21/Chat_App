import React from 'react'
import SidebarWrapper from '../sidebar/sidebarWrapper'
import ChatMessage from './chatMessage'

const Chat = () => {
  return (
    <div className='flex'> 
        <SidebarWrapper />    
        <ChatMessage />
    </div>
  )
}

export default Chat