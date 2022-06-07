import React from 'react'
import Sidebar from './Sidebar';
import OpenChat from './OpenChat';
import { useChats } from '../contexts/ChatsProvider';
import { useAuth } from '../contexts/AuthProvider';

export default function Dashboard() {
  const { selectedChat } = useChats()
  const auth = useAuth()

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Sidebar email={auth.email} />
      {selectedChat && <OpenChat />}
    </div>
  )
}
