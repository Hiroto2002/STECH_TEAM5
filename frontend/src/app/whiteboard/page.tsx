'use client'
import Head from 'next/head'
import { Dispatch, SetStateAction, useState } from 'react'
import { WhiteWebSdk } from 'white-web-sdk'

type CreateWhiteBoardResponse = {
  uuid: string // The room UUID
  teamUUID: string
  appUUID: string
  isBan: boolean
  createdAt: string
  limit: number
}

export default function WhiteBoard() {
  const [data, setData] = useState<CreateWhiteBoardResponse | string>('')
  const [roomApplicationToken, setRoomID] = useState<string>('')
  return (
    <>
      <Head>
        <script src="https://sdk.netless.link/white-web-sdk/2.15.16.js"></script>
      </Head>
      <button onClick={() => onCreateRoom(setData)}>ルーム作成</button>
      <button onClick={() => onGetRoomToken(data.uuid, setRoomID)}>
        ルームに参加申請
      </button>
      <button onClick={() => onJoinRoom(data.uuid, roomApplicationToken)}>
        ルームに参加
      </button>
      {typeof data === 'string' ? (
        'ルームを作成してください'
      ) : (
        <>
          <div>ルームID {data.uuid}</div>
          <div>ルーム申請Token: {roomApplicationToken}</div>
          <div id="whiteboard"></div>
        </>
      )}
    </>
  )
}

const onGetRoomToken = async (
  roomID: string,
  setRoomID: Dispatch<SetStateAction<string>>,
) => {
  const options = {
    method: 'POST',
    // Replace <Room UUID> with the uuid of your room
    url: `https://api.netless.link/v5/tokens/rooms/${roomID}`,
    headers: {
      token: process.env.NEXT_PUBLIC_SDK_TOKEN as string,
      'Content-Type': 'application/json',
      region: 'us-sv',
    },
    body: JSON.stringify({ lifespan: 3600000, role: 'admin' }),
  }
  try {
    const apiResponse = await fetch(options.url, options)
    if (!apiResponse.ok) {
      throw new Error('API request failed')
    }

    const data = await apiResponse.json()
    console.log(`ルームトークン${data}`)
    setRoomID(data)
    return { props: { data } }
  } catch (error) {
    console.log('failed to fetch')
    return { props: { data: 'Internal Server Error' } }
  }
}

// ルーム作成メソッド。sdkトークンを設定する必要がある。sdkトークンはagoraコンソールのプロジェクトのwhiteboardから取れる
const onCreateRoom = async (
  setData: Dispatch<SetStateAction<string | CreateWhiteBoardResponse>>,
) => {
  const options = {
    method: 'POST',
    url: 'https://api.netless.link/v5/rooms',
    headers: {
      token: process.env.NEXT_PUBLIC_SDK_TOKEN as string,
      'Content-Type': 'application/json',
      region: 'us-sv',
    },
    body: JSON.stringify({
      isRecord: false,
    }),
  }
  try {
    const apiResponse = await fetch(options.url, options)
    if (!apiResponse.ok) {
      throw new Error('API request failed')
    }

    const data = await apiResponse.json()
    console.log(data)

    setData(data)

    return { props: { data } }
  } catch (error) {
    console.log('failed to fetch')
    return { props: { data: 'Internal Server Error' } }
  }
}

const onJoinRoom = async (roomID: string, roomToken: string) => {
  const whiteWebSdk = new WhiteWebSdk({
    appIdentifier: process.env.NEXT_PUBLIC_AGORA_APP_IDENTIFIER as string,
    region: 'us-sv',
  })

  const joinRoomParams = {
    uuid: roomID,
    uid: 'user uid 2',
    roomToken: roomToken,
  }

  await whiteWebSdk
    .joinRoom(joinRoomParams)
    .then(function (room) {
      room.bindHtmlElement(document.getElementById('whiteboard'))
    })
    .catch(function (err) {
      console.error(err)
    })
}
