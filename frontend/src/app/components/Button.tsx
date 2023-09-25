import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  href: string
  src: string
}

export const Button = (props: Props) => {
  const { title, href, src } = props
  return (
    <Link
      href={href}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}
    >
      <div
        style={{
          borderRadius: '100%',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: 150,
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Image src={src} width={75} height={75} alt="button" />
      </div>
      <span
        style={{
          fontSize: '1.6rem',
          fontWeight: '300',
        }}
      >
        {title}
      </span>
    </Link>
  )
}
