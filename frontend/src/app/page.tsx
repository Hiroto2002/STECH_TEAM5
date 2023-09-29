'use client'
import { NAV_BUTTONS } from '@/constant/NAV_BUTTONS'
// import dynamic from 'next/dynamic'
import { Button } from './_components/Button'

// const Videocall = dynamic(() => import('../components/AgoraTest'), {
//   ssr: false,
// })

export default function Home() {
  
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
      {NAV_BUTTONS.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          href={button.href}
          src={button.src}
        />
      ))}
    </div>
  )
}
