'use client'
// import dynamic from 'next/dynamic'
import { Button } from './components/Button'

// const Videocall = dynamic(() => import('../components/AgoraTest'), {
//   ssr: false,
// })

export default function Home() {
  const BUTTONS = [
    {
      title: 'whiteboard',
      href: 'whiteboard',
      src: '/whiteboard.svg',
    },
    {
      title: 'videocall',
      href: 'videocall',
      src: '/videocall.svg',
    },
    {
      title: 'chat',
      href: 'chat',
      src: '/chat.svg',
    },
  ]
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
      {BUTTONS.map((button) => (
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
