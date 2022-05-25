import React from 'react'
import Sidebar from './Sidebar';
import OpenChat from './OpenChat';
import { useChats } from '../contexts/ChatsProvider';

export default function Dashboard({ email }) {
  const { selectedChat } = useChats()

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Sidebar email={email} />
      {selectedChat && <OpenChat />}
    </div>
  )
}
