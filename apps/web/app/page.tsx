"use client"
import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider'

const page = () => {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <h1>All messages will appear here</h1>
      </div>
      <div>
        <input type="text" placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendMessage(message)}>send</button>
      </div>

      <div>
        {messages.map((msg: string)=> (
          <li>{msg}</li>
        ))}
      </div>
    </div>
  )
}

export default page;
