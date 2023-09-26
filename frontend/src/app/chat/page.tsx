'use client'

import React, { useEffect, useRef, useState } from 'react'

const Chat = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [sentMessage, setSentMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([''])

  const sendData = (event: any) => {
    event.preventDefault()
    setFormMessage(event.target[0].value)
    const sendData = {
      type: 'message',
      body: event.target[0].value,
    }
    socketRef.current?.send(JSON.stringify(sendData))
  }

  useEffect(() => {
    socketRef.current = new WebSocket(
      'wss://www.mizuhugu35.com/v1/connect?uid=user02&uname=Maeda',
    )
    socketRef.current.onopen = function () {
      setIsConnected(true)
      console.log('Connected')
      const echo = setInterval(() => {
        socketRef.current?.send(JSON.stringify({ type: 'echo', body: 'echo' }))
        console.log('echo');
        
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
    <>
      <h1>WebSocket is connected : {`${isConnected}`}</h1>
      <form onSubmit={sendData}>
        <input type="text" name="socketData" />
        <button type="submit">Server に送信</button>
      </form>
      <h3>form message: {formMessage}</h3>
      <h3>sent message: {sentMessage}</h3>
      {messages.map((message, index) => (
        <h3 key={index + 1}>{message}</h3>
      ))}
    </>
  )
}

export default Chat
