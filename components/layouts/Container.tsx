import React, { ReactNode } from 'react'

const Container = ({
    children,
    className
}:Readonly<{
    children: ReactNode,
    className?: string
}>) => {
  return (
    <div className={`relative max-w-[1200px] w-full m-auto px-4 ${className}`}>{children}</div>
  )
}

export default Container