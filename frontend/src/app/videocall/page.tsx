'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { SideBar } from '@/components/SideBar'

const VideoCall = dynamic(() => import('./_components/VideoCall'), {
  ssr: false,
})

const Video = ({ searchParams }: { searchParams: { name: string } }) => {
  const { name } = searchParams
  return (
    <div style={{ display: 'flex' }}>
      <SideBar userName={name} />
      <VideoCall />
    </div>
  )
}
export default Video
