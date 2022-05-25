import React, { useState, useCallback } from 'react'
import { useChats } from '../contexts/ChatsProvider';

export default function OpenChat() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedChat } = useChats()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedChat.recipients.map(r => r.email),
      text
    )
    setText('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'end', padding: '3px' }}>
          {selectedChat.messages.map((message, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                style={{ display: 'flex', margin: '0.25rem 0', flexDirection: 'column', alignItems: message.fromMe ? 'end' : 'start', alignSelf: message.fromMe ? 'end' : 'initial', padding: '3px' }}
              >
                <div
                  className={`${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                  style={{ borderRadius: '0.25rem', padding: '0.25rem 0.5rem', background: message.fromMe ? '#007bff' : '#dee2e6', color: message.fromMe ? '#fff' : '#6c757d' }}
                >
                  {message.text}
                </div>
                <div className={` ${message.fromMe ? 'text-right' : ''}`}
                  style={{ fontSize: '80%', color: '#6c757d', textAlign: message.fromMe ? 'right' : 'initial' }}>

                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '0.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            width: '100%',

          }}>
            <textarea
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none', flexGrow: 1 }}
            />
            <button type="submit" className='send-button'>Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}
