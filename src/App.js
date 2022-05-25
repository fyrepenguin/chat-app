import React from 'react'
import Login from './components/Login'
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard'
import { ContactsProvider } from './contexts/ContactsProvider'
import { ChatsProvider } from './contexts/ChatsProvider';
import './App.css'

function App() {
  const [email, setEmail] = useLocalStorage('email', null)

  const dashboard = (
    <>
      <ContactsProvider email={email}>
        <ChatsProvider email={email}>
          <Dashboard email={email} />
        </ChatsProvider>
      </ContactsProvider>
    </>
  )

  return (
    email ? dashboard : <Login onEmailSubmit={setEmail} />
  )
}

export default App;
