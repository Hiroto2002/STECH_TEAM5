'use client'

import React, { useEffect, useRef, useState } from 'react'
import { SideBar } from '@/components/SideBar'
import { useRouter } from 'next/navigation'

type DB_Response_Chat = {
  user_id: string
  user_name: string
  message: string
  created_at: string
}

type Message = {
  message: string
  user: string
}
type SocketData = {
  body: string
  from_type: 'user'
  from_uid: string
  from_uname: string
  type: 'message' | 'echo'
}

const Chat = ({ searchParams }: { searchParams: { name: string } }) => {
  const { name } = searchParams

  const router = useRouter()
  if (name == null || !localStorage.getItem('user')) router.push('/')

  const socketRef = useRef<WebSocket>()
  const chatRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<DB_Response_Chat[]>([])

  const handleSetMessages = (data: DB_Response_Chat) => {
    setMessages((prev) => [...prev, data])
  }

  const sendData = () => {
    if (chatRef.current == null) return
    const text = chatRef.current.value
    const sendData = {
      type: 'message',
      body: text,
    }
    socketRef.current?.send(JSON.stringify(sendData))
  }

  const fetchChatDB = async () => {
    const res = await fetch('https://www.mizuhugu35.com/v1/chat', {
      mode: 'no-cors',
    })
    const data: DB_Response_Chat[] = await res.json()
    return data
  }

  useEffect(() => {
    const userId = localStorage.getItem('user')
    socketRef.current = new WebSocket(
      `wss://www.mizuhugu35.com/v1/connect?uid=${userId}&uname=${name}`,
    )
    socketRef.current.onopen = function () {
      console.log('Connected')
      const echo = setInterval(() => {
        socketRef.current?.send(JSON.stringify({ type: 'echo', body: 'echo' }))
        console.log('echo')
      }, 10000)
      return () => clearInterval(echo)
    }

    socketRef.current.onclose = function () {
      console.log('closed')
    }

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      const data: SocketData = JSON.parse(event.data)
      if (data.type === 'echo') return
      const date = new Date()
      // 新しいフォーマットに変換
      const formattedDate =
        date.getFullYear() +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + date.getDate()).slice(-2) +
        '/' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2) +
        ':' +
        ('0' + date.getSeconds()).slice(-2)

      const message: DB_Response_Chat = {
        user_id: data.from_uid,
        user_name: data.from_uname,
        message: data.body,
        created_at: formattedDate,
      }
      setMessages((prev) => [...prev, message])
    }

    // fetchChatDB().then((data) => {
    //   console.log(data)

    //   const messages = data.map((message) => message.message)
    //   setMessages((prev) => [...prev, ...messages])
    // })

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef.current.close()
    }
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {messages &&
          messages.map((message, index) => (
            <div
              key={index + 1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '700px',
                margin: '30px 0 0 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={
                    message.user_id === localStorage.getItem('user')
                      ? {
                          color: '#33cc99',
                          fontWeight: 'bold',
                          margin: '0 10px 0 0',
                          fontSize: '1.5rem',
                        }
                      : {
                          color: '#000',
                          fontWeight: 'bold',
                          margin: '0 10px 0 0',
                          fontSize: '1.5rem',
                        }
                  }
                >
                  {message.user_name}
                </p>
                <p style={{color:"#aaa"}}>{message.created_at}</p>
              </div>
              <p style={{fontSize:"1.3rem"}}>{message.message}</p>
            </div>
          ))}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            width: '100%',
            height: '40px',
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
          }}
        >
          <input
            type="text"
            name="socketData"
            ref={chatRef}
            placeholder="メッセージ"
            style={{
              width: '600px',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
            }}
          />
          <button
            onClick={sendData}
            style={{
              border: 'none',
              background: '#33cc99',
              color: '#fff',
              width: '80px',
              borderRadius: '5px',
            }}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
