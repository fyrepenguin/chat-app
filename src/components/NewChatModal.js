import React, { useState } from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { useChats } from '../contexts/ChatsProvider'

export default function NewChatModal({ closeModal }) {
  const [selectedContactEmails, setSelectedContactEmails] = useState([])
  const { contacts } = useContacts();

  const { createChat } = useChats()

  function handleSubmit(e) {
    e.preventDefault()

    createChat(selectedContactEmails)
    closeModal()
  }

  function handleCheckboxChange(contactEmail) {
    setSelectedContactEmails(prevSelectedContactEmails => {
      if (prevSelectedContactEmails.includes(contactEmail)) {
        return prevSelectedContactEmails.filter(prevEmail => {
          return contactEmail !== prevEmail
        })
      } else {
        return [...prevSelectedContactEmails, contactEmail]
      }
    })
  }

  return (
    <>
      <button onClick={closeModal} className="modal-close" title="Close Modal">X</button>
      <h3>Create Chat</h3>
      <div className="modal-area">
        <div className='modal-body'>
          <form onSubmit={handleSubmit} className='modal-form'>
            {contacts.map(contact => (
              <div controlId={contact.email} key={contact.email} className="form-group form-checkbox">
                <input
                  name="contact"
                  type="checkbox"
                  value={selectedContactEmails.includes(contact.email)}
                  label={contact.firstName}
                  onChange={() => handleCheckboxChange(contact.email)}
                />
                <label htmlFor="contact">{contact.firstName}</label>
              </div>
            ))}
            <footer>
              <button className="primary" onClick={handleSubmit}>Create Contact</button>
              <button className="secondary" onClick={closeModal}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
