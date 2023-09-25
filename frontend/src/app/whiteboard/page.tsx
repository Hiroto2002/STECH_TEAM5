'use client'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from 'react'
import { WhiteWebSdk } from 'white-web-sdk'

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
