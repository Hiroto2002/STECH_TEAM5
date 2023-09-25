'use client'
import dynamic from 'next/dynamic'

const WhiteBoard = dynamic(() => import('./_components/WhiteBoard'), {
  ssr: false,
})

export default function Page() {
  return (
    <>
      <WhiteBoard />
    </>
  )
}
