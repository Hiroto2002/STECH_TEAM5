import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const WebSocketTest: NextPage = () => {
  const socketRef = useRef<WebSocket>()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL as string,
    )

    socketRef.current.onopen = function () {
      setIsConnected(true)
    }

    socketRef.current.onclose = function () {
      setIsConnected(false)
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
    </>
  )
}

export default WebSocketTest
