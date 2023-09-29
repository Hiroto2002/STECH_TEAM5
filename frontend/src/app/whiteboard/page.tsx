'use client'
import { SideBar } from '@/components/SideBar'
import dynamic from 'next/dynamic'

const WhiteBoard = dynamic(() => import('./_components/WhiteBoard'), {
  ssr: false,
})

export default function Page() {
  return (
    <>
      <SideBar/>
      <WhiteBoard />
    </>
  )
}
