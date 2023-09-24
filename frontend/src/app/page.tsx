'use client'
import dynamic from 'next/dynamic'

const Videocall = dynamic(() => import('../components/AgoraTest'), {
  ssr: false,
})

export default function Home() {
  return <Videocall />
}
