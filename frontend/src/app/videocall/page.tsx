import React from 'react'
import { SideBar } from '@/components/SideBar'

const VideoCall = ({ searchParams }: { searchParams: { name: string } }) => {
  const { name } = searchParams
  return (
    <div>
      <SideBar userName={name} />
    </div>
  )
}
export default VideoCall
