import React, { useState } from 'react'
import Chats from './Chats'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewChatModal from './NewChatModal'

const CHATS_KEY = 'chats'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ email }) {
  const [activeKey, setActiveKey] = useState(CHATS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const chatsOpen = activeKey === CHATS_KEY

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '250px', display: 'flex', flexDirection: 'column' }} >
      <nav style={{
        display: 'flex', justifyContent: 'center', borderBottom: '1px solid #dee2e6', flexWrap: 'wrap',
        paddingLeft: 0,
        marginBottom: 0,
        listStyle: 'none',
      }}>
        <div className='nav-item'>
          <button onClick={() => setActiveKey(CHATS_KEY)} className={activeKey === CHATS_KEY ? 'active' : ''} >Chats</button>
        </div>
        <div className='nav-item'>
          <button onClick={() => setActiveKey(CONTACTS_KEY)} className={activeKey === CONTACTS_KEY ? 'active' : ''}>Contacts</button>
        </div>
      </nav>
      <div
        style={{ borderRight: '1px solid #dee2e6', overflow: 'auto', flexGrow: '1' }}>
        {activeKey === CHATS_KEY && <div>
          <Chats />
        </div>}
        {activeKey === CONTACTS_KEY && <div>
          <Contacts />
        </div>}
      </div>
      <div style={{ padding: '0.5rem', borderTop: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', fontSize: '80%' }}>
        Your Email: <span style={{ color: '#6c757d' }}>{email}</span>
      </div>
      <button onClick={() => setModalOpen(true)} className="modal-opener" style={{ borderRadius: 'none' }}>
        New {chatsOpen ? 'Chat' : 'Contact'}
      </button>

      <div className={`modal ${modalOpen ? 'open' : ''}`} id="modal">
        <div className="modal-content">
          {chatsOpen ?
            <NewChatModal closeModal={closeModal} /> :
            <NewContactModal closeModal={closeModal} />
          }
        </div>
      </div>
    </div>
  )
}
