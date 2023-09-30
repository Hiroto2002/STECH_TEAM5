'use client'
import { useState } from 'react'
import { Button } from './_components/Button'
import { NAV_BUTTONS } from '@/constant/NAV_BUTTONS'
// import dynamic from 'next/dynamic'

// const Videocall = dynamic(() => import('../components/AgoraTest'), {
//   ssr: false,
// })

export default function Home() {
  localStorage.setItem('user', '1')
  const [name, setName] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        justifyContent: 'space-evenly',
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          position: 'absolute',
          top: '125px',
          border: 'none',
          padding: '10px',
          borderRadius: '5px',
          width: '400px',
        }}
        placeholder="ユーザー名"
      />
      {NAV_BUTTONS.map((button, index) => (
        <Button
          key={index + 1}
          title={button.title}
          href={
            name ? `${button.href}?name=${name}` : `${button.href}?name=NoName`
          }
          src={button.src}
        />
      ))}
    </div>
  )
}
