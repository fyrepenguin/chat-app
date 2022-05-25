import React, { useRef } from 'react'

export default function Login({ onEmailSubmit }) {
  const emailRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onEmailSubmit(emailRef.current.value)
  }

  function createNewEmail() {
    onEmailSubmit(emailRef.current.value)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', }} className="main-container">
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div>
          <label>Enter Your Email</label>
          <input type="text" ref={emailRef} required />
        </div>
        <button type="submit" className="primary">Login</button>
        <button onClick={createNewEmail} className="secondary">Create A New Email</button>
      </form>
    </div>
  )
}
