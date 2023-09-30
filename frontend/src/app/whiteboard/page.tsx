'use client'
import dynamic from 'next/dynamic'
import { SideBar } from '@/components/SideBar'

const WhiteBoard = dynamic(() => import('./_components/WhiteBoard'), {
  ssr: false,
})

export default function Page({
  searchParams,
}: {
  searchParams: { name: string }
}) {
  const { name } = searchParams

  return (
    <div style={{ display: 'flex' }}>
      <SideBar userName={name} />
      <WhiteBoard />
    </div>
  )
}
