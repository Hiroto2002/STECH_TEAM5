'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import AgoraUIKit from 'agora-react-uikit'

export default function Home() {
  const [videoCall, setVideoCall] = useState(true)

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
    channel: process.env.NEXT_PUBLIC_AGORA_CHANNEL as string,
    token: process.env.NEXT_PUBLIC_AGORA_TOKEN as string,
  }

  const callbacks = {
    EndCall: () => setVideoCall(false),
  }

  return videoCall ? (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  )
}
