import React from 'react'
import { isHmrRefresh } from 'next/dist/server/app-render/work-unit-async-storage.external'
import Link from '../link'

const SpecialHeading = ({mainText, secText, href}:{mainText: string, secText?: string, href?: string}) => {
  return (
    <div className='flex justify-between items-center mb-4'>
        <h2 className='text-primary capitalize text-3xl font-bold'> {mainText} </h2>
        {secText&&(
          <Link href={href||""}>
          <h3 className='text-gray-300 hover:underline'> {secText} </h3>

          </Link>
)}
    </div>
  )
}

export default SpecialHeading