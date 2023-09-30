'use client'
import { useState } from 'react'
import AgoraUIKit from 'agora-react-uikit'

const VideoCall = () => {
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
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={{
          BtnTemplateStyles: { background: '#33cc99' },
          localBtnContainer: { background: '#33cc99' },
        }}
      />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        justifyContent: 'space-evenly',
      }}
    >
      <button
        onClick={() => setVideoCall(true)}
        style={{
          border: 'none',
          background: '#33cc99',
          color: '#fff',
          borderRadius: '5px',
          padding: '10px 30px',
          fontSize: '2rem',
        }}
      >
        Join
      </button>
    </div>
  )
}

export default VideoCall
