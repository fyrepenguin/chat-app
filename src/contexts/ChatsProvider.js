import React, { useContext, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';


const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({ email, children }) {
  const [chats, setChats] = useLocalStorage('chats', [])
  const [selectedChatIndex, setSelectedChatIndex] = useState(0)
  const { contacts } = useContacts()

  function createChat(recipients) {
    setChats(prevChats => {
      return [...prevChats, { recipients, messages: [] }]
    })
  }
  function deleteChat(index) {
    setChats(prevChats => {
      return prevChats.filter((_, i) => i !== index)
    })
  }

  const addMessageToChat = useCallback(({ recipients, text, sender }) => {
    setChats(prevChats => {
      let madeChange = false
      const newMessage = { sender, text }
      const newChats = prevChats.map(chat => {
        if (arrayEquality(chat.recipients, recipients)) {
          madeChange = true
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }

        return chat
      })

      if (madeChange) {
        return newChats
      } else {
        return [
          ...prevChats,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setChats])

  function sendMessage(recipients, text) {
    addMessageToChat({ recipients, text, sender: email })
  }

  const formattedChats = chats.map((chat, index) => {
    const recipients = chat.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.email === recipient
      })
      const name = (contact && contact.firstName) || recipient
      return { email: recipient, name }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.email === message.sender
      })
      const name = (contact && contact.firstName) || message.sender
      const fromMe = email === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedChatIndex
    return { ...chat, messages, recipients, selected }
  })

  const value = {
    chats: formattedChats,
    selectedChat: formattedChats[selectedChatIndex],
    sendMessage,
    selectChatIndex: setSelectedChatIndex,
    createChat,
    deleteChat
  }

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}