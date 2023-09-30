'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
    } else {
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
      }}
    >
      {sortNav.map((button) => (
        <button
          key={button.title}
          onClick={() => handlePushRouter(button.href)}
          style={
            IsActive(button.href)
              ? {
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 15,
                  border: 'none',
                  borderLeft: '5px solid #ccc',
                }
              : {
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 15,
                  border: 'none',
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
              padding: 10,
            }}
          >
            <img src={button.src} width={30} height={30} alt="button" />
          </div>
        </button>
      ))}
    </div>
  )
}
