"use client"
import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
const Motion = ({className="",children, init, animate}:{children:ReactNode, className?: string, init:any, animate:any}) => {
  return (
    <motion.div className={className} initial={init} whileInView={animate}>{children}</motion.div>
  )
}

export default Motion