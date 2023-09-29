'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { NAV_BUTTONS } from '@/constant/NAV_BUTTONS'

export const SideBar = () => {
  const router = useRouter()
  const IsActive = (pathname: string) => usePathname() === pathname
  const handlePushRouter = (pathname: string) => {
    router.push(pathname)
  }

  const sortNav = NAV_BUTTONS.sort((a) => {
    if (IsActive(a.href)) {
      return -1
    }else{
      return 0
    }
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        height: '100vh',
        padding: 10,
      }}
    >
      {sortNav.map((button) => (
        <div
          key={button.title}
          onClick={() => handlePushRouter(button.href)}
          style={
            IsActive(button.href)?{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 15,
              borderBottom: '2px solid #ccc',
            }:{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 15,
            }
            }
        >
          <div
            style={{
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
          >
            <img src={button.src} width={30} height={30} alt="button" />
          </div>
        </div>
      ))}
    </div>
  )
}
