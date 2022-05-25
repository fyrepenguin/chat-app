import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children, email }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [{ firstName: 'You', email }])

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

  function updateContact(email, name) {
    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact.email === email) {
          return { ...contact, name }
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
