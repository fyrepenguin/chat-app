import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthProvider';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const auth = useAuth()
  const [contacts, setContacts] = useLocalStorage('contacts', [{ firstName: 'You', email: auth.email }])

  function createContact({ email, firstName, lastName, phoneNumber }) {
    setContacts(prevContacts => {
      return [...prevContacts, { email, firstName, lastName, phoneNumber }]
    })
  }
  function deleteContact(email) {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.email !== email)
    })
  }

  function updateContact(email, firstName, lastName, phoneNumber) {
    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact.email === email) {
          return { ...contact, firstName, lastName, phoneNumber }
        }
        return contact
      })
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact, deleteContact, updateContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
