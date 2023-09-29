'use client'

import { SideBar } from '@/components/SideBar'
import React, { useEffect, useRef, useState } from 'react'

const Chat = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [sentMessage, setSentMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([''])
  const inputRef = useRef<HTMLInputElement>(null)

  const sendData = () => {
    if (inputRef.current == null) return
    const text = inputRef.current.value
    console.log(inputRef.current.value)
    setFormMessage(text)
    const sendData = {
      type: 'message',
      body: text,
    }
    socketRef.current?.send(JSON.stringify(sendData))
  }

  useEffect(() => {
    socketRef.current = new WebSocket(
      'wss://www.mizuhugu35.com/v1/connect?uid=user02&uname=Maed',
    )
    socketRef.current.onopen = function () {
      setIsConnected(true)
      console.log('Connected')
      const echo = setInterval(() => {
        socketRef.current?.send(JSON.stringify({ type: 'echo', body: 'echo' }))
        console.log('echo')
      }, 30000)
      return () => clearInterval(echo)
    }

    socketRef.current.onclose = function () {
      console.log('closed')
      setIsConnected(false)
    }

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      setSentMessage(event.data)
      const data = JSON.parse(event.data)
      setMessages((prev) => [...prev, data.body])
    }

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef.current.close()
    }
  }, [])

  return (
    <div style={{display:"flex"}}>
      <SideBar />
      <h1>WebSocket is connected : {`${isConnected}`}</h1>
      <input type="text" name="socketData" ref={inputRef} />
      <button onClick={sendData}>Server に送信</button>
      <h3>form message: {formMessage}</h3>
      <h3>sent message: {sentMessage}</h3>
      {messages.map((message, index) => (
        <h3 key={index + 1}>{message}</h3>
      ))}
    </div>
  )
}

export default Chat
